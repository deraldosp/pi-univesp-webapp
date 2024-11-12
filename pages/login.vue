<template>
  <v-card class="elevation-12" min-width="600">
    <v-card-title class="headline text-center my-3" width="500px">Login</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="login">
        <v-text-field v-model="email" variant="outlined" label="Email" prepend-icon="mdi-email" type="email"
          required></v-text-field>
        <v-text-field variant="outlined" v-model="password" label="Password" prepend-icon="mdi-lock" type="password"
          required></v-text-field>
        <v-btn type="submit" :disabled="loading" :loading="loading" color="primary" block>Login</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { IAuth } from '../services/auth/types'
const { $services, $toast } = useNuxtApp();

definePageMeta({
  layout: 'auth'
})

const email = ref('')
const password = ref('')
const router = useRouter()
const loading = ref(false)

const login = () => {
  loading.value = true
  $services.auth.login({ email: email.value, password: password.value })
    .then((res: IAuth) => {
      localStorage.setItem('auth', JSON.stringify(res.data))
      localStorage.setItem('token', res.data.access_token)
      loading.value = false
      router.push('/');
    })
    .catch(e => {
      $toast.error('Ocorreu uma falha ao tentar logar, verifique suas credenciais, ou tente novamente mais tarde')
      loading.value = false
    })
};
</script>
