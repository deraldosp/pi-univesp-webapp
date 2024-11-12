<template>
    <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="500">

      <v-card prepend-icon="mdi-account" title="Doação">
        <v-form @submit.prevent="save()" v-model="formValid">

          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-select v-model="formEntregaDoacao.tipo_doacao_id" label="Tipo de Doação" item-title="nome"
                  :rules="rules.obrigatorio" item-value="id" :items="tiposDoacoes"></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model="formEntregaDoacao.quantidade" variant="outlined"
                :rules="rules.obrigatorio" label="Quantidade fornecida" type="number" min="0"></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model="formEntregaDoacao.valor" variant="outlined"
                :rules="rules.obrigatorio" label="Valor" type="text"></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <!-- Este espaço está vazio. Adicione conteúdo se necessário. -->
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis">* campos obrigatórios</small>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Fechar" variant="plain" type="button" @click="dialog = false"></v-btn>

            <v-btn color="primary" text="Gravar" type="submit" variant="tonal"></v-btn>
          </v-card-actions>

        </v-form>

      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ITipoDoacao } from '~/services/commons/types';

const { $services, $toast } = useNuxtApp();
const emit = defineEmits(['saved', 'updated']);

const doadorSelected = ref(null)
const dialog = ref(false)
const formValid = ref(false)
const loading = ref(false)
const tiposDoacoes = ref([])
const loadingTiposDoacoes = ref(false)
const formEntregaDoacao = ref<any>({
  tipo_doacao_id: null,
  quantidade: null,
  valor: null,
  observacao: null
})

const rules = {
  obrigatorio: [
    (v: any) => {
      if (v) return true
      return 'O campo é obrigatório'
    }
  ]
}

const loadTiposDoacoes = async () => {
  loadingTiposDoacoes.value = true
  try {
    const data = await $services.commons.listaTiposDoacoes()
    
    tiposDoacoes.value = data
    loadingTiposDoacoes.value = false
  } catch (e) {
    $toast.error('Ocorreu um erro ao carregar os tipos de doações')
    console.error(e)
    loadingTiposDoacoes.value = false
  }
}

onMounted(() => {
  loadTiposDoacoes()
})

const save = async () => {
  if (formValid.value) {
    console.log(formEntregaDoacao.value);
  }
}

const cleanForm = () => {
  Object.keys(formEntregaDoacao.value).forEach((key) => {
    formEntregaDoacao.value[key] = null
  })
}

const open = (doador?: any) => {
  doadorSelected.value = doador
  formEntregaDoacao.value.beneficiario_id = doador.id
  dialog.value = true;

};

const close = () => {
  cleanForm()
  dialog.value = false;
};

defineExpose({ open, close });
</script>

<style scoped>

</style>