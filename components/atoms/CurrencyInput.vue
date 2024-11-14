<template>
  <v-text-field
   variant="outlined"
   v-model="formattedValue"
   ref="inputRef"
  >
  </v-text-field>
</template>

<script setup lang="ts">
import { useCurrencyInput } from 'vue-currency-input';
import { watch } from 'vue';

const props = defineProps({ modelValue: Number });

const { inputRef, formattedValue, numberValue, setValue } = useCurrencyInput({
  currency: 'BRL',
  hideCurrencySymbolOnFocus: false,
  hideGroupingSeparatorOnFocus: false,
  precision: 2,
  valueRange: { min: 0 },
  autoDecimalDigits: true,
});

watch(
  () => props.modelValue,
  (value) => {
    setValue(value ?? null);
  }
);
</script>

<style scoped>

</style>