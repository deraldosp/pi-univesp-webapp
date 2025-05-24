<template>
  <v-app>
    <v-card>
      <v-layout>
        <v-app-bar color="primary" prominent>
          <v-app-bar-nav-icon variant="text" @click.stop="toggle()"></v-app-bar-nav-icon>
          <v-toolbar-title>Caritas - Sistema de controle de doações</v-toolbar-title>
          <v-spacer></v-spacer>
          <span class="mr-3">{{ user.name }}</span>
          <v-btn icon="mdi-logout" title="Sair" @click="logout()" variant="text"></v-btn>
        </v-app-bar>

        <NavigationMenu ref="menuNav" />
    
        <v-main style="height: 100vh; overflow: auto;">
          <v-card-text>
            <v-container fluid style="min-width: 1300px;">
            <slot />
            </v-container>
          </v-card-text>
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import NavigationMenu from '~/components/organisms/NavigationMenu.vue';

const { $services, $router } = useNuxtApp();
const user = ref({})
const menuNav = ref<typeof NavigationMenu | null>(null)


const items = [
  {
    title: 'Home',
    value: '/',
    icon: 'mdi-home'
  },
  {
    title: 'Beneficiarios',
    value: '/beneficiarios',
    icon: 'mdi-account-group'
  },
  {
    title: 'Doadores',
    value: '/doadores',
    icon: 'mdi-account-heart'
  }
  // {
  //   title: 'Unidades Beneficentes',
  //   value: '/unidades',
  // },
  // {
  //   title: 'Distribuição',
  //   value: '/distribuicao',
  // },
  // {
  //   title: 'Admin',
  //   value: '/admin',
  // },
]
const drawer = ref(false)
const group = ref(null)

watch(group, () => {
  drawer.value = false
})

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem('auth') || '{}').user
})

const toggle = () => {
  if (menuNav.value) {
    menuNav.value.toggleDrawer()
  }
}

const clearSession = () => {
  localStorage.removeItem('auth')
  localStorage.removeItem('token')
}

const logout = () => {
  $services.auth.logout().then(() => {
    clearSession()
    $router.push('/login')
  }).catch(() => {
    clearSession()
    $router.push('/login')
  })
}
</script>