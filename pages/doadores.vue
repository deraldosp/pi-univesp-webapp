<template>
  <div>
    <v-toolbar class="pr-3">
      <v-toolbar-title>Doadores</v-toolbar-title>
      <v-spacer />
      <v-btn icon base-color="primary" elevation="2" @click="openModalDoador">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <Doadores ref="tableDoadores" @edit="editBeneficiario"></Doadores>
    <DoadorDetailDialog ref="bfDialogComponent" @saved="addDoador" @updated="updateDoador" />
  </div>
</template>

<script setup lang="ts">
import Doadores from '~/components/modecules/Doadores.vue';
import DoadorDetailDialog from '~/components/organisms/DoadorDetailDialog.vue';
import { ref } from 'vue'
import type { IDoador } from '~/services/doadores/types';

definePageMeta({
  middleware: 'auth',
})

const tableDoadores = ref<typeof Doadores | null>(null)
const bfDialogComponent = ref<typeof DoadorDetailDialog | null>(null)

const openModalDoador = (): void => {
  if (bfDialogComponent.value) {
    bfDialogComponent.value.open()
  }
}

const addDoador = (doador: IDoador): void => {
  if (tableDoadores.value) {
    tableDoadores.value.addItemBeneficiarios(doador)
  }
}

const editBeneficiario = (doador: any): void => {
  if (bfDialogComponent.value) {
    bfDialogComponent.value.open(doador)
  }
}

const updateDoador = (doador: IDoador): void => {
  if (tableDoadores.value) {
    tableDoadores.value.updateItemBeneficiarios(doador)
  }
}

</script>