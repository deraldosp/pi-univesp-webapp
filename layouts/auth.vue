<template>
  <v-app>
    <v-main>
      <v-container class="fill-height d-flex justify-center align-center">
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>