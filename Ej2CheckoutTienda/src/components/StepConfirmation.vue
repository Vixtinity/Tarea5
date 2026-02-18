<script setup lang="ts">
import { useCheckout } from '@/composables/useCheckout'

const { billingData, shippingData } = useCheckout()
</script>

<template>
  <div class="step-confirmation">
    <h2>Confirmación de Pedido</h2>
    <p>Revise sus datos antes de finalizar.</p>

    <div class="summary-section">
      <h3>Datos de Facturación</h3>
      <p>{{ billingData.fullName }}</p>
      <p>{{ billingData.email }}</p>
    </div>

    <div class="summary-section">
      <h3>Dirección de Envío</h3>
      <p v-if="shippingData.sameAsBilling">Misma que facturación</p>
      <div v-else>
        <p>{{ shippingData.fullName }}</p>
        <p>{{ shippingData.address }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-confirmation {
  max-width: 600px;
  margin: 0 auto;
}
.summary-section {
  margin-bottom: 20px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 4px;
}
</style>
