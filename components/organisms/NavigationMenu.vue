<template>
  <div>
    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
      <v-list :activatable="true">
        <NuxtLink :key="index" style="text-decoration: none;" :to="item.value" v-for="(item, index) in items">
          <v-list-item :prepend-icon="item.icon">
            {{ item.title }}
          </v-list-item>
        </NuxtLink>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const drawer = ref(false)
const group = ref(null)
const items = ref([
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
])

watch(group, () => {
  drawer.value = false
})

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

defineExpose({
  toggleDrawer
})

</script>