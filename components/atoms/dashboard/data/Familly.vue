<template>
    <div>
        <v-card
        :color="color"
        variant="outlined"
        class="d-flex align-center justify-center w-100"
        align="center"
        elevation="7"
        height="250"
        min-width="400"
      >
        <v-card-item>
          <div>
            <div class="text-h6 mb-1">
              Famílias atendidas
            </div>
            <div class="text-h6 mb-3">25</div>

            <div class="text-h6 mb-1">
              Média de membros por família
            </div>
            <div class="text-h6">3.6</div>
          </div>
        </v-card-item>

        
      </v-card>
    </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'

  const color = ref('indigo')

</script>
<style lang="">
    
</style>