<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="500" persistent>

      <v-card prepend-icon="mdi-account" title="Entrega de Beneficio">
        <v-form @submit.prevent="save()" v-model="formValid">

          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-select v-model="formBeneficio.unidade_id" label="Unidade" item-title="nome" item-value="id"
                  :items="unidades"></v-select>
              </v-col>

              <v-col cols="12">
                <v-select v-model="formBeneficio.tipo_beneficio_id" label="Tipo Benefício" item-title="tipo_beneficio"
                  item-value="id" :items="beneficios"></v-select>
              </v-col>


              <v-col cols="12" md="6">
                <v-text-field v-model="formBeneficio.quantidade" :rules="rules.obrigatorio" variant="outlined"
                  label="Quantidade fornecida" type="number" min="0"></v-text-field>
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
import { ref, reactive, onMounted } from 'vue';
import type { IDistribuicao } from '~/services/distribuicao/types';

const { $services, $toast } = useNuxtApp();
const emit = defineEmits(['saved', 'updated']);

const beneficiarioSelected = ref(null)
const loading = ref(false)
const dialog = ref(false)
const beneficios = ref([])
const formValid = ref(false)
const unidades = ref([])

const formBeneficio = ref<IDistribuicao>({
  beneficiario_id: null,
  unidade_id: null,
  tipo_beneficio_id: null,
  quantidade: null,
});

const rules = {
  obrigatorio: [
    (v: any) => {
      if (v) return true
      return 'O campo é obrigatório'
    }
  ]
}

const listaUnidades = async () => {
  const entidade = localStorage.getItem('auth')? Number(JSON.parse(localStorage.getItem('auth') as string).user?.entidade_id) : 999 
  try {
    loading.value = true
    const result = await $services.commons.listaUnidadesPorEntidade(entidade)
    unidades.value = result
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false
  }
}

const listaBeneficios = async () => {
  try {
    loading.value = true
    const result = await $services.commons.listaBeneficios()
    beneficios.value = result
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  listaUnidades()
  listaBeneficios()
})

const cleanForm = () => {
  Object.keys(formBeneficio.value).forEach((key) => {
    const dinamicKey = key as keyof IDistribuicao
    formBeneficio.value[dinamicKey] = null
  })
}


const save = async () => {
  if (formValid.value) {
    let result
    try {
      loading.value = true
      result = await $services.distribuicao.takeBenefit(formBeneficio.value)
      emit('saved', result)

      $toast.success('Registro gravado com sucesso!')
      cleanForm()
      close()
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false
    }
  }
}

const open = (beneficiario?: any) => {
  beneficiarioSelected.value = beneficiario
  formBeneficio.value.beneficiario_id = beneficiario.id
  dialog.value = true;

};

const close = () => {
  cleanForm()
  dialog.value = false;
};

defineExpose({ open, close });
</script>
