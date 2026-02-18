<script setup lang="ts">
import { useCheckout } from '@/composables/useCheckout'

const { billingData, errors } = useCheckout()
</script>

<template>
  <div class="step-billing">
    <h2>Datos de Facturación</h2>
    <form @submit.prevent>
      <div class="form-group">
        <label for="fullName">Nombre Completo</label>
        <input type="text" id="fullName" v-model="billingData.fullName" />
        <span class="error" v-if="errors.billing.fullName">{{ errors.billing.fullName }}</span>
      </div>

      <div class="form-group">
        <label for="nif">NIF/CIF</label>
        <input type="text" id="nif" v-model="billingData.nif" />
        <span class="error" v-if="errors.billing.nif">{{ errors.billing.nif }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="billingData.email" />
        <span class="error" v-if="errors.billing.email">{{ errors.billing.email }}</span>
      </div>

      <div class="form-group">
        <label for="phone">Teléfono</label>
        <input type="tel" id="phone" v-model="billingData.phone" placeholder="+34..." />
        <span class="error" v-if="errors.billing.phone">{{ errors.billing.phone }}</span>
      </div>

      <div class="form-group">
        <label for="address">Dirección</label>
        <input type="text" id="address" v-model="billingData.address" />
        <span class="error" v-if="errors.billing.address">{{ errors.billing.address }}</span>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="postalCode">Código Postal</label>
          <input type="text" id="postalCode" v-model="billingData.postalCode" />
          <span class="error" v-if="errors.billing.postalCode">{{ errors.billing.postalCode }}</span>
        </div>
        <div class="form-group">
           <label for="city">Ciudad</label>
           <input type="text" id="city" v-model="billingData.city" />
           <span class="error" v-if="errors.billing.city">{{ errors.billing.city }}</span>
        </div>
      </div>
      
       <div class="form-row">
        <div class="form-group">
          <label for="province">Provincia</label>
          <input type="text" id="province" v-model="billingData.province" />
        </div>
        <div class="form-group">
           <label for="country">País</label>
           <select id="country" v-model="billingData.country">
             <option value="España">España</option>
             <option value="Portugal">Portugal</option>
             <option value="Francia">Francia</option>
           </select>
        </div>
      </div>

    </form>
  </div>
</template>

<style scoped>
.step-billing {
  max-width: 600px;
  margin: 0 auto;
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

input, select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error {
  color: red;
  font-size: 0.85em;
  margin-top: 5px;
}
</style>
