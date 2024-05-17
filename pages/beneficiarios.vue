<template>
  <div>
    <v-toolbar class="pr-3">
      <v-toolbar-title>Beneficiários</v-toolbar-title>
      <v-spacer />
      <v-btn icon base-color="primary" elevation="2" @click="openModalBeneficiario">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <Beneficiarios ref="tableBeneficiarios" @edit="editBeneficiario"></Beneficiarios>
    <BeneficiarioDetailDialog ref="bfDialogComponent" @saved="addBeneficiario" @updated="updateBeneficiario" />
  </div>
</template>

<script setup lang="ts">
import Beneficiarios from '~/components/modecules/Beneficiarios.vue';
import BeneficiarioDetailDialog from '~/components/organisms/BeneficiarioDetailDialog.vue';
import { ref } from 'vue'
import type { IBeneficiario } from '~/services/beneficiarios/types';

definePageMeta({
  middleware: 'auth',
})

const tableBeneficiarios = ref<typeof Beneficiarios | null>(null)
const bfDialogComponent = ref<typeof BeneficiarioDetailDialog | null>(null)

const openModalBeneficiario = (): void => {
  if (bfDialogComponent.value) {
    bfDialogComponent.value.open()
  }
}

const addBeneficiario = (beneficiario: IBeneficiario): void => {
  if (tableBeneficiarios.value) {
    tableBeneficiarios.value.addItemBeneficiarios(beneficiario)
  }
}

const editBeneficiario = (beneficiario: any): void => {
  if (bfDialogComponent.value) {
    bfDialogComponent.value.open(beneficiario)
  }
}

const updateBeneficiario = (beneficiario: IBeneficiario): void => {
  if (tableBeneficiarios.value) {
    tableBeneficiarios.value.updateItemBeneficiarios(beneficiario)
  }
}

</script>