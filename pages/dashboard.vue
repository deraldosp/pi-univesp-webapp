<template>
    <ClientOnly>
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
              <!-- Add your fourth chart component here -->
            </v-col>
            <v-col cols="6">
              <!-- Add your fifth chart component here -->
            </v-col>
          </v-row>
        </v-container>
      </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import Donates from '~/components/atoms/dashboard/charts/Donates.vue';
import ReceiptDonates from '~/components/atoms/dashboard/charts/ReceiptDonates.vue';
import TypesReceiptDonates from '~/components/atoms/dashboard/charts/TypesReceiptDonates.vue';
</script>