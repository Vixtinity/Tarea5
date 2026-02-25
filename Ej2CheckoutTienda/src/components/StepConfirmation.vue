<script setup lang="ts">
import { useCheckout } from '@/composables/useCheckout'
const { billingData, shippingData, paymentData, totals } = useCheckout()
</script>

<template>
  <div>
    <h2>Resumen</h2>
    <div class="p-3 bg-light border rounded">
      <p><strong>Cliente:</strong> {{ billingData.fullName }}</p>
      <p><strong>Envío:</strong> {{ shippingData.sameAsBilling ? 'Dirección facturación' : shippingData.address }}</p>
      <p><strong>Pago:</strong> {{ paymentData.method.toUpperCase() }}</p>
      <hr>
      <div class="d-flex justify-content-between">
        <span>Subtotal:</span><span>{{ totals.subtotal }}€</span>
      </div>
      <div class="d-flex justify-content-between text-success" v-if="totals.discount > 0">
        <span>Descuento:</span><span>-{{ totals.discount }}€</span>
      </div>
      <div class="d-flex justify-content-between fw-bold">
        <span>TOTAL:</span><span>{{ totals.total }}€</span>
      </div>
    </div>
    <div class="mt-3">
      <label><input type="checkbox" required> Acepto los términos y condiciones</label>
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
