<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="1200">

      <v-card prepend-icon="mdi-account" title="Cadastro de Beneficiários">
        <v-form @submit.prevent="save()" v-model="formValid">

          <v-card-text>
            <v-row dense>
              <v-col cols="12" md="8" sm="6">
                <v-text-field v-model="formCadastro.nome" variant="outlined" label="Nome*" :rules="rules.nome"
                  required></v-text-field>
              </v-col>

              <v-col cols="12" md="2" sm="6">
                <v-text-field v-model="formCadastro.rg" variant="outlined" label="RG"></v-text-field>
              </v-col>

              <v-col cols="12" md="2" sm="6">
                <v-text-field v-model="formCadastro.cpf" variant="outlined" label="CPF" v-maska:[cpfOptions]
                  required></v-text-field>
              </v-col>

              <v-col cols="12" md="2" sm="6">
                <v-date-input prepend-icon="" prepend-inner-icon="$calendar" v-model="dataNascimento"
                  v-maska:[dateOptions] clearable label="Nascimento" variant="outlined" hide-actions
                  @update:modelValue="updateDataNascimento"></v-date-input>
              </v-col>

              <v-col cols="12" md="2" sm="6">
                <v-autocomplete v-model="formCadastro.genero" :items="['Masculino', 'Feminino', 'Outro']" label="Sexo"
                  variant="outlined" auto-select-first></v-autocomplete>
              </v-col>

              <v-col cols="12" md="2" sm="6">
                <v-autocomplete v-model="formCadastro.estado_civil"
                  :items="['Solteiro', 'Casado', 'Divorciado', 'Viúvo']" label="Estado Civil" variant="outlined"
                  auto-select-first></v-autocomplete>
              </v-col>

              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="formCadastro.email" variant="outlined" label="Email" required></v-text-field>
              </v-col>

              <v-col cols="12" md="2" sm="6">
                <v-text-field v-model="formCadastro.telefone" variant="outlined" label="Telefone"></v-text-field>
              </v-col>

              <v-col cols="12" md="2" sm="6">
                <v-text-field v-model="formCadastro.cep" variant="outlined" label="CEP" v-maska:[cepOptions] required
                  @blur="searchCep"></v-text-field>
              </v-col>

              <v-col cols="12" md="5" sm="6">
                <v-text-field v-model="formCadastro.endereco" variant="outlined" :rules="rules.obrigatorio"
                  label="Endereço*" required></v-text-field>
              </v-col>

              <v-col cols="12" md="2" sm="6">
                <v-text-field v-model="formCadastro.numero" variant="outlined" label="Número*"
                  :rules="rules.obrigatorio" ref=numero required></v-text-field>
              </v-col>

              <v-col cols="12" md="3" sm="6">
                <v-text-field v-model="formCadastro.complemento" variant="outlined" label="Complemento"></v-text-field>
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

              <v-col cols="12" md="6">
                <v-text-field v-model="formCadastro.numero_dependentes" :rules="rules.obrigatorio" variant="outlined"
                  label="Quantidade de dependentes*" type="number" min="0"></v-text-field>
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
import { ref, shallowRef } from 'vue';

const { $services, $toast } = useNuxtApp();
const emit = defineEmits(['saved', 'updated']);

const dataNascimento = shallowRef(null)
const loading = ref(false)
const dialog = ref(false);
const numero = ref();
const formValid = ref(false)
const cpfOptions = { mask: '###.###.###-##' };
const cepOptions = { mask: '#####-###' };
const dateOptions = { mask: '##/##/####' };

const formCadastro = ref<any>({
  id: null,
  nome: '',
  rg: '',
  cpf: '',
  data_nascimento: null,
  genero: '',
  estado_civil: '',
  endereco: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  uf: '',
  cep: '',
  telefone: '',
  email: '',
  numero_dependentes: ''
});

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

const updateDataNascimento = (date: Date) => {
  formCadastro.value.data_nascimento = date.toISOString().substring(0, 10)
}

const cleanForm = () => {
  Object.keys(formCadastro.value).forEach(key => {
    formCadastro.value[key] = ''
  })
}


const save = async () => {
  if (formValid.value) {
    const formBeneficiario = JSON.parse(JSON.stringify(formCadastro.value))
    let result
    try {
      loading.value = true
      if (formBeneficiario.id) {
        result = await $services.beneficiarios.updateBeneficiario(formBeneficiario.id, formBeneficiario)
        emit('updated', result)
      } else {
        result = await $services.beneficiarios.ceateBeneficiario(formBeneficiario)
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
  Object.keys(formCadastro.value).forEach(key => {
    formCadastro.value[key] = item[key]
  })
}

const open = (beneficiario?: any) => {
  if (beneficiario) {
    populateFormFromItem(JSON.parse(JSON.stringify(beneficiario)))
  }
  dialog.value = true;

};

const close = () => {
  cleanForm()
  dialog.value = false;
};

const searchCep = async () => {
  if (formCadastro.value.cep.replace('-', '').length === 8) {
    try {
      const result = await $fetch<any>(`https://viacep.com.br/ws/${formCadastro.value.cep}/json/`)
      if (result.erro) return

      populateAddress(result)
      numero.value.focus()
    } catch (e: any) {
      console.error(e)
    }
  }
}

const populateAddress = (data: any): void => {
  formCadastro.value.endereco = data.logradouro
  formCadastro.value.bairro = data.bairro
  formCadastro.value.cidade = data.localidade
  formCadastro.value.uf = data.uf
}

defineExpose({ open, close, cleanForm });
</script>
