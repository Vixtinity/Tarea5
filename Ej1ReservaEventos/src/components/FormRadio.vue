<template>
  <label class="radio-label">
    <input
      type="radio"
      :value="value"
      v-model="model"
      :required="required"
    />
    {{ label }}
  </label>
</template>

<script setup lang="ts">
const model = defineModel<string>()

defineProps<{
  label: string
  value: string
  required?: boolean
}>()
</script>