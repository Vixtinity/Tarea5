<script setup lang="ts">
import { useCheckout } from '@/composables/useCheckout'

const { shippingData, errors } = useCheckout()
</script>

<template>
  <div class="step-shipping">
    <h2>Dirección de Envío</h2>
    
    <div class="checkbox-group">
      <input type="checkbox" id="sameAsBilling" v-model="shippingData.sameAsBilling" />
      <label for="sameAsBilling">Misma dirección que facturación</label>
    </div>

    <form v-if="!shippingData.sameAsBilling" @submit.prevent>
      <div class="form-group">
        <label for="shippingFullName">Nombre del Destinatario</label>
        <input type="text" id="shippingFullName" v-model="shippingData.fullName" />
        <span class="error" v-if="errors.shipping.fullName">{{ errors.shipping.fullName }}</span>
      </div>

      <div class="form-group">
        <label for="shippingAddress">Dirección de Envío</label>
        <input type="text" id="shippingAddress" v-model="shippingData.address" />
        <span class="error" v-if="errors.shipping.address">{{ errors.shipping.address }}</span>
      </div>

       <div class="form-row">
        <div class="form-group">
          <label for="shippingPostalCode">Código Postal</label>
          <input type="text" id="shippingPostalCode" v-model="shippingData.postalCode" />
          <span class="error" v-if="errors.shipping.postalCode">{{ errors.shipping.postalCode }}</span>
        </div>
        <div class="form-group">
           <label for="shippingCity">Ciudad</label>
           <input type="text" id="shippingCity" v-model="shippingData.city" />
           <span class="error" v-if="errors.shipping.city">{{ errors.shipping.city }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="shippingProvince">Provincia</label>
          <input type="text" id="shippingProvince" v-model="shippingData.province" />
        </div>
        <div class="form-group">
           <label for="shippingCountry">País</label>
            <select id="shippingCountry" v-model="shippingData.country">
             <option value="España">España</option>
             <option value="Portugal">Portugal</option>
             <option value="Francia">Francia</option>
           </select>
        </div>
      </div>

      <div class="form-group">
        <label for="shippingPhone">Teléfono de Contacto</label>
        <input type="tel" id="shippingPhone" v-model="shippingData.phone" />
        <span class="error" v-if="errors.shipping.phone">{{ errors.shipping.phone }}</span>
      </div>

      <div class="form-group">
        <label for="instructions">Instrucciones de Entrega (Opcional)</label>
        <textarea id="instructions" v-model="shippingData.instructions" rows="3" maxlength="200"></textarea>
        <span class="error" v-if="errors.shipping.instructions">{{ errors.shipping.instructions }}</span>
        <small>{{ shippingData.instructions.length }}/200</small>
      </div>

    </form>
    <div v-else class="info-message">
        <p>El pedido se enviará a la dirección de facturación.</p>
    </div>
  </div>
</template>

<style scoped>
.step-shipping {
  max-width: 600px;
  margin: 0 auto;
}

.checkbox-group {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.checkbox-group label {
    margin-bottom: 0;
    cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  gap: 15px;
}
.form-row .form-group {
    flex: 1;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input, select, textarea {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error {
  color: red;
  font-size: 0.85em;
  margin-top: 5px;
}

.info-message {
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 4px;
    text-align: center;
    color: #666;
}
</style>
