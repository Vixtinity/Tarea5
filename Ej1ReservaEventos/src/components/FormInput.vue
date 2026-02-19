<template>
  <div>
    <label>{{ label }}</label>
    <input 
      :type="type" 
      :value="modelValue" 
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="$emit('blur')"
      :required="required"
    />
  </div>
</template>
<script setup lang="ts">
defineProps(['label', 'modelValue', 'type', 'required']);
defineEmits(['update:modelValue', 'blur']);
</script>