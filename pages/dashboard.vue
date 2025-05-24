<template>
  <!-- <v-container fluid style="min-width: 1350px;"> -->
    <div>
      <v-toolbar class="pr-3">
        <v-toolbar-title>Dashboard</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="4">
            <Donates />
          </v-col>
          <v-col cols="4">
            <ReceiptDonates />
          </v-col>
          <v-col cols="4">
            <TypesReceiptDonates />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <DonatesByUnits class="w-100" />
          </v-col>
          <v-col cols="6" class="d-flex justify-center align-center">
            <Familly />
          </v-col>
        </v-row>
      </v-container>
    </div>
  <!-- </v-container> -->
</template>

<script setup lang="ts">
import Donates from '~/components/atoms/dashboard/charts/Donates.vue';
import ReceiptDonates from '~/components/atoms/dashboard/charts/ReceiptDonates.vue';
import TypesReceiptDonates from '~/components/atoms/dashboard/charts/TypesReceiptDonates.vue';
import DonatesByUnits from '~/components/atoms/dashboard/charts/DonatesByUnits.vue';
import Familly from '~/components/atoms/dashboard/data/Familly.vue';

</script>