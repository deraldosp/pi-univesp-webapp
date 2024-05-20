<template>
  <v-app>
    <v-card>
      <v-layout>
        <v-app-bar color="primary" prominent>
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>Caritas - Sistema de controle de doações</v-toolbar-title>

          <v-spacer></v-spacer>

          <!-- <template v-if="$vuetify.display.mdAndUp">
            <v-btn icon="mdi-magnify" variant="text"></v-btn>

            <v-btn icon="mdi-filter" variant="text"></v-btn>
          </template>

<v-btn icon="mdi-dots-vertical" variant="text"></v-btn> -->
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
          <v-list :activatable="true">
            <NuxtLink :key="index" style="text-decoration: none;" :to="item.value" v-for="(item, index) in items">
              <v-list-item :prepend-icon="item.icon">
                {{ item.title }}
              </v-list-item>
            </NuxtLink>
          </v-list>
        </v-navigation-drawer>

        <v-main style="height: 100vh;">
          <v-card-text>
            <slot />
          </v-card-text>
        </v-main>
      </v-layout>
    </v-card>

  </v-app>
</template>

<script setup>
import { ref, watch } from 'vue'

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
</script>