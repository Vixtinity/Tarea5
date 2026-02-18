<script setup lang="ts">
import { useCheckout } from '@/composables/useCheckout'

const { shippingData, errors } = useCheckout()
</script>

<template>
  <div class="step-shipping">
    <h2 class="step-heading">Dirección de Envío</h2>
    
    <div class="checkbox-group">
      <label class="checkbox-label">
        <input type="checkbox" id="sameAsBilling" v-model="shippingData.sameAsBilling" />
        <span class="checkbox-text">Misma dirección que facturación</span>
      </label>
    </div>

    <form v-if="!shippingData.sameAsBilling" @submit.prevent>
      <div class="form-group">
        <label for="shippingFullName">Nombre del Destinatario</label>
        <input 
            type="text" 
            id="shippingFullName" 
            v-model="shippingData.fullName" 
            class="form-control"
            :class="{ 'is-invalid': errors.shipping.fullName }"
        />
        <span class="error-text" v-if="errors.shipping.fullName">{{ errors.shipping.fullName }}</span>
      </div>

      <div class="form-group">
        <label for="shippingAddress">Dirección de Envío</label>
        <input 
            type="text" 
            id="shippingAddress" 
            v-model="shippingData.address" 
            class="form-control"
            :class="{ 'is-invalid': errors.shipping.address }"
        />
        <span class="error-text" v-if="errors.shipping.address">{{ errors.shipping.address }}</span>
      </div>

       <div class="form-row">
        <div class="form-group">
          <label for="shippingPostalCode">Código Postal</label>
          <input 
            type="text" 
            id="shippingPostalCode" 
            v-model="shippingData.postalCode" 
            class="form-control"
            :class="{ 'is-invalid': errors.shipping.postalCode }"
        />
          <span class="error-text" v-if="errors.shipping.postalCode">{{ errors.shipping.postalCode }}</span>
        </div>
        <div class="form-group">
           <label for="shippingCity">Ciudad</label>
           <input 
            type="text" 
            id="shippingCity" 
            v-model="shippingData.city" 
            class="form-control"
            :class="{ 'is-invalid': errors.shipping.city }"
           />
           <span class="error-text" v-if="errors.shipping.city">{{ errors.shipping.city }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="shippingProvince">Provincia</label>
          <input type="text" id="shippingProvince" v-model="shippingData.province" class="form-control" />
        </div>
        <div class="form-group">
           <label for="shippingCountry">País</label>
            <select id="shippingCountry" v-model="shippingData.country" class="form-control">
             <option value="España">España</option>
             <option value="Portugal">Portugal</option>
             <option value="Francia">Francia</option>
           </select>
        </div>
      </div>

      <div class="form-group">
        <label for="shippingPhone">Teléfono de Contacto</label>
        <input 
            type="tel" 
            id="shippingPhone" 
            v-model="shippingData.phone" 
            class="form-control"
            :class="{ 'is-invalid': errors.shipping.phone }"
        />
        <span class="error-text" v-if="errors.shipping.phone">{{ errors.shipping.phone }}</span>
      </div>

      <div class="form-group">
        <label for="instructions">Instrucciones de Entrega (Opcional)</label>
        <textarea 
            id="instructions" 
            v-model="shippingData.instructions" 
            rows="3" 
            maxlength="200"
            class="form-control"
            :class="{ 'is-invalid': errors.shipping.instructions }"
        ></textarea>
        <span class="error-text" v-if="errors.shipping.instructions">{{ errors.shipping.instructions }}</span>
        <small class="char-count">{{ shippingData.instructions.length }}/200</small>
      </div>

    </form>
    <div v-else class="info-message">
        <p>El pedido se enviará a la dirección de facturación.</p>
    </div>
  </div>
</template>

<style scoped>
.step-heading {
  margin-bottom: 1.5rem;
  color: var(--color-primary);
  font-weight: 600;
}

.checkbox-group {
    margin-bottom: 1.5rem;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    user-select: none;
}

input[type="checkbox"] {
    width: 1.25rem;
    height: 1.25rem;
    accent-color: var(--color-accent);
}

.form-group {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  gap: 1.25rem;
}
.form-row .form-group {
    flex: 1;
}

label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--color-text-main);
  font-size: 0.9rem;
}

.form-control {
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-background);
  transition: all 0.2s;
  width: 100%;
}

.form-control:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-control.is-invalid {
  border-color: var(--color-error);
}

.error-text {
  color: var(--color-error);
  font-size: 0.85em;
  margin-top: 0.25rem;
}

.char-count {
    text-align: right;
    font-size: 0.8em;
    color: var(--color-text-muted);
    margin-top: 0.25rem;
}

.info-message {
    padding: 1.5rem;
    background-color: var(--color-surface-muted);
    border-radius: var(--radius-md);
    text-align: center;
    color: var(--color-text-muted);
    border: 1px dashed var(--color-border-active);
}
</style>
