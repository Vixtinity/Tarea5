<template>
  <label class="checkbox-label">
    <input
      type="checkbox"
      :value="value"
      v-model="model"
      :required="required"
    />
    {{ label }}
  </label>
</template>

<script setup lang="ts">
// Soporta arrays para grupos de checkboxes o boolean para uno solo
const model = defineModel<any>()

defineProps<{
  label: string
  value?: string // El valor que se añade al array si es grupo
  required?: boolean
}>()
</script>