<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="1200">

      <v-card prepend-icon="mdi-account" title="Cadastro de Doador">
        <v-form @submit.prevent="save()" v-model="formValid">

          <v-card-text>
            <v-row dense>
              <v-col cols="12" md="6" sm="6">
                <v-text-field v-model="formCadastro.nome" variant="outlined" label="Nome*" :rules="rules.nome"
                  required></v-text-field>
              </v-col>

              <v-col cols="12" md="6" sm="6">
                <v-text-field v-model="formCadastro.razao_social" variant="outlined" label="Razão Social"></v-text-field>
              </v-col>

              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="formCadastro.cnpj_cpf" variant="outlined" label="Cnpj/CPF" v-maska:[cnpjCpfOptions]
                  required></v-text-field>
              </v-col>

              <v-col cols="12" md="6" sm="6">
                <v-text-field v-model="formCadastro.email" variant="outlined" label="Email" required></v-text-field>
              </v-col>

              <v-col cols="12" md="2" sm="6">
                <v-text-field v-model="formCadastro.telefone" variant="outlined" label="Telefone"></v-text-field>
              </v-col>

              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="formCadastro.cep" variant="outlined" label="CEP" v-maska:[cepOptions] required
                  @blur="searchCep"></v-text-field>
              </v-col>

              <v-col cols="12" md="8" sm="6">
                <v-text-field v-model="formCadastro.endereco" variant="outlined" :rules="rules.obrigatorio"
                  label="Endereço*" required></v-text-field>
              </v-col>

              <v-col cols="12" md="5" sm="6">
                <v-text-field v-model="formCadastro.bairro" variant="outlined" label="Bairro"></v-text-field>
              </v-col>

              <v-col cols="12" md="5" sm="6">
                <v-text-field v-model="formCadastro.cidade" variant="outlined" :rules="rules.obrigatorio"
                  label="Cidade*"></v-text-field>
              </v-col>

              <v-col cols="12" md="2" sm="6">
                <v-text-field v-model="formCadastro.uf" variant="outlined" :rules="rules.obrigatorio" label="UF*"
                  maxlength="2"></v-text-field>
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

            <v-btn text="Fechar" variant="plain" type="button" @click="close()"></v-btn>

            <v-btn color="primary" text="Gravar" type="submit" variant="tonal"></v-btn>
          </v-card-actions>

        </v-form>

      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, shallowRef, defineEmits, computed } from 'vue';
import type { IDoador } from '~/services/doadores/types';

const { $services, $toast } = useNuxtApp();
const emit = defineEmits(['saved', 'updated']);

const loading = ref(false)
const dialog = ref(false);
const formValid = ref(false)
const cpfOptions = { mask: '###.###.###-##' };
const cnpjOptions = { mask: '##.###.###/####-61' };
const cepOptions = { mask: '#####-###' };

let formCadastro = reactive<IDoador>({
  id: null,
  nome: '',
  razao_social: '',
  cnpj_cpf: '',
  telefone: '',
  endereco: '',
  bairro: '',
  cidade: '',
  uf: '',
  cep: '',
  email: '',
});

const cnpjCpfOptions = computed(() => {
  return formCadastro.cnpj_cpf.length > 14 ? cnpjOptions : cpfOptions
})

const rules = {
  obrigatorio: [
    (v: any) => {
      if (v) return true
      return 'O campo é obrigatório'
    }
  ],
  nome: [
    (v: any) => {
      if (v) return true
      return 'O nome é obrigatório'
    },
    (v: any) => {
      if (v.length > 3) return true
      return 'O nome deve ter mais de 3 caracteres'
    }
  ]
}

const cleanForm = () => {
  formCadastro = {
    id: null,
    nome: '',
    razao_social: '',
    cnpj_cpf: '',
    telefone: '',
    endereco: '',
    bairro: '',
    cidade: '',
    uf: '',
    cep: '',
    email: '',
    };
}

const save = async () => {
  if (formValid.value) {
    const formDoador = JSON.parse(JSON.stringify(formCadastro))
    let result
    try {
      loading.value = true
      if (formDoador.id) {
        result = await $services.doadores.updateDoador(formDoador.id, formDoador)
        emit('updated', result)
      } else {
        result = await $services.doadores.createDoador(formDoador)
        emit('saved', result)
      }

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

const populateFormFromItem = (item: any) => {
  Object.keys(formCadastro).forEach(key => {
    formCadastro[key as keyof IDoador] = item[key as keyof IDoador]
  })
}

const open = (doador?: any) => {
  if (doador) {
    populateFormFromItem(JSON.parse(JSON.stringify(doador)))
  }
  dialog.value = true;

};

const close = () => {
  cleanForm()
  dialog.value = false;
};

const searchCep = async () => {
  if (formCadastro.cep.replace('-', '').length === 8) {
    try {
      const result = await $fetch<any>(`https://viacep.com.br/ws/${formCadastro.cep}/json/`)
      if (result.erro) return

      populateAddress(result)
    } catch (e: any) {
      console.error(e)
    }
  }
}

const populateAddress = (data: any): void => {
  formCadastro.endereco = data.logradouro
  formCadastro.bairro = data.bairro
  formCadastro.cidade = data.localidade
  formCadastro.uf = data.uf
}

defineExpose({ open, close, cleanForm });
</script>
