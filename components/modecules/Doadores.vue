<template>
  <ClientOnly>
    <v-container fluid>
      <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="doadores"
        :items-length="totalItems" :loading="loading" item-value="name" :fixed-header="true" @update:options="loadItems"
        height="72vh">
        <template v-slot:item.actions="{ item }">
          <v-icon class="me-2" size="small" title="Editar Doador" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon class="me-2" size="small" title="Excluir Doador" @click="isDelete(item)">
            mdi-delete
          </v-icon>
          <v-icon size="small" title="Registrar Doação" @click="registrarDoacao(item)">mdi-hand-coin</v-icon>
        </template>
  
        <template v-slot:item.last_benefit.data_entrega="{ item }">
          {{ item.last_benefit ? formatDate(item.last_benefit.data_entrega) : '' }}
        </template>
  
        <template v-slot:tfoot>
          <tr>
            <td>
              <v-text-field v-model="search" class="ma-2" density="compact" placeholder="Buscar Doador..."
                hide-details clearable></v-text-field>
            </td>
          </tr>
        </template>
      </v-data-table-server>
  
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Atenção</v-card-title>
          <v-card-subtitle class="text-subtitle-1">Confirma a exclusão de {{ selectedToDelete?.nome
            }}?</v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">Confirmar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  
    <EntregaDoacao ref="dialogEntrega" @saved="updateItemDoador"></EntregaDoacao>
  </ClientOnly>
</template>

<script lang="ts" setup>

import type { IPaginate, IDoador } from '../../services/doadores/types';
import { ref, onMounted, watch } from 'vue'
import EntregaDoacao from './EntregaDoacao.vue';
import { debounce } from 'lodash'


const { $services, $toast } = useNuxtApp();

const emit = defineEmits(['edit'])


const dialogEntrega = ref<typeof EntregaDoacao | null>(null)


const search = ref('')
const dialogDelete = ref(false)
const selectedToDelete = ref<any | null>()
const doadores = ref<IDoador[]>([]);
const paginate = reactive<IPaginate>({ perPage: 10, page: 1 });
const headers = ref([
  { title: 'Nome', key: 'nome', sortable: false },
  { title: 'Razão Social', key: 'razao_social', sortable: false },
  { title: 'Telefone', key: 'telefone', sortable: false },
  { title: 'Endereço', key: 'endereco', sortable: false },
  { title: 'Ações', key: 'actions', sortable: false }
]);

const itemsPerPage = ref<number>(10);
const totalItems = ref(0);
const loading = ref(false);
const page = ref<number>(1)


const loadDoadores = async (paginate: IPaginate, search?: string) => {
  try {
    loading.value = true
    const {
      data,
      per_page,
      total,
      current_page
    } = await $services.doadores.getDoadores(paginate, search);

    doadores.value = data;
    itemsPerPage.value = per_page;
    totalItems.value = total;
    page.value = current_page;

  } catch (error: any) {
    console.info(error.message)
  } finally {
    loading.value = false
  }
}


// Função para formatar a data
const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

const pagination = (to: string) => {
  if (paginate.page && to === 'prev') {
    paginate.page = paginate.page - 1;
  } else if (paginate.page && to === 'next') {
    paginate.page = paginate.page + 1
  }
}

const loadItems = (value: any) => {
  loadDoadores({ perPage: value.itemsPerPage, page: value.page })
}

const addItemDoador = (doador: IDoador) => {
  doadores.value.push(doador)
}

const updateItemDoador = (doador: IDoador) => {
  const index = doadores.value.findIndex(item => item.id === doador.id)
  doadores.value[index] = doador
}

const editItem = (item: any) => {
  emit('edit', item)
}

const closeDelete = () => {
  dialogDelete.value = false
  selectedToDelete.value = null
}

const isDelete = (item: any) => {
  selectedToDelete.value = item
  dialogDelete.value = true

}

const deleteItemConfirm = () => {
  const id = selectedToDelete.value.id
  if (id) {
    try {
      $services.doadores.deleteDoador(id)
      const index = doadores.value.findIndex(item => item.id === id)
      doadores.value.splice(index)

      $toast.success('Doador excluído com sucesso')
      closeDelete()

    } catch (error) {
      console.log(error);
      $toast.error(`ocorreu um erro verifique o console`)

    }
  }
}

const registrarDoacao = (item: any) => {
  if (dialogEntrega.value) {
    dialogEntrega.value.open(item)
  }
}

const onSearch = debounce(function (newValue: string) {
  loadDoadores({ perPage: 10, page: 1 }, newValue)
}, 400)


watch(search, (value: string) => {
  onSearch(value)
})


onMounted(() => {
  loadDoadores({ perPage: 10, page: 1 });
});

defineExpose({ addItemDoador, updateItemDoador })

</script>

<style scoped>
/* Estilos opcionais para personalização */
</style>
