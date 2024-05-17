<template>
  <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
    <v-list :activatable="true">
      <v-list-item v-for="(item, index) in items">
        <NuxtLink :key="index" :to="item.value">{{ item.title }}</NuxtLink>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, props } from 'vue'

const items = [
  {
    title: 'Home',
    value: '/',
  },
  {
    title: 'Beneficiarios',
    value: '/beneficiarios',
  },
  {
    title: 'Unidades Beneficentes',
    value: '/unidades',
  },
  {
    title: 'Distribuição',
    value: '/distribuicao',
  },
  {
    title: 'Admin',
    value: '/admin',
  },
]

const drawer = ref(false)
const group = ref(null)

watch(group, () => {
  drawer.value = false
})
</script>