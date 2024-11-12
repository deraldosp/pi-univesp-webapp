<template>
  <ClientOnly>
    <v-container fluid>
      <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="beneficiarios"
        :items-length="totalItems" :loading="loading" item-value="name" :fixed-header="true" @update:options="loadItems"
        height="72vh">
        <template v-slot:item.actions="{ item }">
          <v-icon class="me-2" size="small" title="Editar Beneficiário" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon class="me-2" size="small" title="Excluir Beneficiario" @click="isDelete(item)">
            mdi-delete
          </v-icon>
          <v-icon size="small" title="Entregar Benefício" @click="entregarBeneficio(item)">mdi-cart-heart</v-icon>
        </template>
  
        <template v-slot:item.last_benefit.data_entrega="{ item }">
          {{ item.last_benefit ? formatDate(item.last_benefit.data_entrega) : '' }}
        </template>
  
        <template v-slot:tfoot>
          <tr>
            <td>
              <v-text-field v-model="search" class="ma-2" density="compact" placeholder="Buscar beneficiario..."
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
  
    <EntregaBeneficio ref="dialogEntrega" @saved="updateItemBeneficiarios"></EntregaBeneficio>
  </ClientOnly>
</template>

<script lang="ts" setup>

import type { IPaginate, IBeneficiario } from '../../services/beneficiarios/types';
import { ref, onMounted, defineEmits, watch } from 'vue'
import EntregaBeneficio from './EntregaBeneficio.vue';
import { debounce } from 'lodash'


const { $services, $toast } = useNuxtApp();

const emit = defineEmits(['edit'])


const dialogEntrega = ref<typeof EntregaBeneficio | null>(null)


const search = ref('')
const dialogDelete = ref(false)
const selectedToDelete = ref<any | null>()
const beneficiarios = ref<IBeneficiario[]>([]);
const paginate = reactive<IPaginate>({ perPage: 10, page: 1 });
const headers = ref([
  { title: 'Nome', key: 'nome', sortable: false },
  { title: 'Telefone', key: 'telefone', sortable: false },
  { title: 'Endereço', key: 'endereco', sortable: false },
  { title: 'Dependentes', key: 'numero_dependentes', sortable: false },
  { title: 'Último Benefício', key: 'last_benefit.data_entrega', sortable: false },
  { title: 'Ações', key: 'actions', sortable: false }
]);

const itemsPerPage = ref<number>(10);
const totalItems = ref(0);
const loading = ref(false);
const page = ref<number>(1)


const loadBeneficiarios = async (paginate: IPaginate, search?: string) => {
  try {
    loading.value = true
    const {
      data,
      per_page,
      total,
      current_page
    } = await $services.beneficiarios.getBeneficiarios(paginate, search);

    beneficiarios.value = data;
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
  const date = new Date(`${dateString} 00:00:00`);
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
  loadBeneficiarios({ perPage: value.itemsPerPage, page: value.page })
}

const addItemBeneficiarios = (beneficiario: IBeneficiario) => {
  beneficiarios.value.push(beneficiario)
}

const updateItemBeneficiarios = (beneficiario: IBeneficiario) => {
  const index = beneficiarios.value.findIndex(item => item.id === beneficiario.id)
  beneficiarios.value[index] = beneficiario
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
      $services.beneficiarios.deleteBeneficiario(id)
      const index = beneficiarios.value.findIndex(item => item.id === id)
      beneficiarios.value.splice(index)

      $toast.success('Beneficiario excluido com sucesso')
      closeDelete()

    } catch (error) {
      console.log(error);
      $toast.error(`ocorreu um erro verifique o console`)

    }
  }
}

const entregarBeneficio = (item: any) => {
  if (dialogEntrega.value) {
    dialogEntrega.value.open(item)
  }
}

const onSearch = debounce(function (newValue: string) {
  loadBeneficiarios({ perPage: 10, page: 1 }, newValue)
}, 400)


watch(search, (value: string) => {
  onSearch(value)
})


onMounted(() => {
  loadBeneficiarios({ perPage: 10, page: 1 });
});

defineExpose({ addItemBeneficiarios, updateItemBeneficiarios })

</script>

<style scoped>
/* Estilos opcionais para personalização */
</style>
