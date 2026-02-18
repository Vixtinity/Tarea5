<template>
  <small v-if="mensaje && mensaje !== 'Correcto'" style="color:red">
    {{ mensaje }}
  </small>
</template>
<script setup lang="ts">
defineProps<{ mensaje: string }>();
</script>