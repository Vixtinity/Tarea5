<script setup lang="ts">
import { useCheckout } from '@/composables/useCheckout'

const { nextStep } = useCheckout()
</script>

<template>
  <div class="step-payment">
    <h2>Método de Pago</h2>
    <p>Seleccione su método de pago (Simulación)</p>
    
    <div class="payment-options">
      <label>
        <input type="radio" name="payment" value="credit_card" checked />
        Tarjeta de Crédito
      </label>
      <label>
        <input type="radio" name="payment" value="paypal" />
        PayPal
      </label>
    </div>
  </div>
</template>

<style scoped>
.step-payment {
  max-width: 600px;
  margin: 0 auto;
}
.payment-options {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}
</style>
