<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <select v-model="model" :required="required">
      <option value="" disabled>Selecciona una opción</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.text }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>()

defineProps<{
  label: string
  options: { value: string; text: string }[]
  required?: boolean
}>()
</script>