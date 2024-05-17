<template>
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
        <v-icon size="small" title="Entregar Benefício" @click="() => { }">mdi-cart-heart</v-icon>
      </template>
    </v-data-table-server>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">confirma a exclusão do Beneficiario {{ selectedToDelete.nome }}?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>

import type { IPaginate, IBeneficiario } from '../../services/beneficiarios/types';
import { ref, onMounted, defineEmits } from 'vue'
const { $services, $toast } = useNuxtApp();

const emit = defineEmits(['edit'])

const dialogDelete = ref(false)
const selectedToDelete = ref()
const beneficiarios = ref<IBeneficiario[]>([]);
const paginate = reactive<IPaginate>({ perPage: 10, page: 1 });
const headers = ref([
  { title: 'Nome', key: 'nome', sortable: false },
  { title: 'Telefone', key: 'telefone', sortable: false },
  { title: 'Endereço', key: 'endereco', sortable: false },
  { title: 'Dependentes', key: 'numero_dependentes', sortable: false },
  { title: 'Último Benefício', key: 'dataUltimoBeneficio', sortable: false },
  { title: 'Ações', key: 'actions', sortable: false }
]);

const itemsPerPage = ref<number>(10);
const totalItems = ref(0);
const loading = ref(false);
const page = ref<number>(1)


const loadBeneficiarios = async (paginate: IPaginate) => {
  try {
    loading.value = true
    const {
      data,
      per_page,
      total,
      current_page
    } = await $services.beneficiarios.getBeneficiarios(paginate);

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
      $toast.success('Beneficiario excluido com sucesso')
      selectedToDelete.value = null
      closeDelete()

    } catch (error) {
      console.log(error);
      $toast.error(`ocorreu um erro verifique o console`)

    }
  }
}



onMounted(() => {
  loadBeneficiarios({ perPage: 10, page: 1 });
});

defineExpose({ addItemBeneficiarios, updateItemBeneficiarios })

</script>

<style scoped>
/* Estilos opcionais para personalização */
</style>
