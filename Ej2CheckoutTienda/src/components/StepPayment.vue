<script setup lang="ts">
import { ref } from 'vue'
import { useCheckout } from '@/composables/useCheckout'
const { paymentData, errors, applyDiscountAsync } = useCheckout()
const msg = ref('')

const handleDiscount = async () => {
  const res: any = await applyDiscountAsync()
  msg.value = res.message
}
</script>

<template>
  <div>
    <h3>Método de Pago</h3>
    <div class="d-flex gap-3 mb-3">
      <label><input type="radio" v-model="paymentData.method" value="card"> Tarjeta</label>
      <label><input type="radio" v-model="paymentData.method" value="bizum"> Bizum</label>
    </div>

    <div v-if="paymentData.method === 'card'" class="card p-3">
      <input v-model="paymentData.cardNumber" class="form-control mb-2" placeholder="Número Tarjeta">
      <input v-model="paymentData.cardHolder" class="form-control mb-2" placeholder="Titular">
      <div class="d-flex gap-2">
        <input v-model="paymentData.cardExpiry" class="form-control" placeholder="MM/YY">
        <input v-model="paymentData.cardCvv" class="form-control" placeholder="CVV">
      </div>
    </div>

    <div v-if="paymentData.method === 'bizum'" class="card p-3">
      <input v-model="paymentData.bizumPhone" class="form-control" placeholder="Teléfono Bizum">
    </div>

    <div class="mt-4">
      <input v-model="paymentData.discountCode" placeholder="Cupón">
      <button @click="handleDiscount" type="button">Aplicar</button>
      <p>{{ msg }}</p>
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
