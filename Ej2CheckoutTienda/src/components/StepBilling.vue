<script setup lang="ts">
import { useCheckout } from '@/composables/useCheckout'

const { billingData, errors } = useCheckout()
</script>

<template>
  <div class="step-billing">
    <h2 class="step-heading">Datos de Facturación</h2>
    <form @submit.prevent>
      <div class="form-group">
        <label for="fullName">Nombre Completo</label>
        <input 
            type="text" 
            id="fullName" 
            v-model="billingData.fullName" 
            class="form-control"
            :class="{ 'is-invalid': errors.billing.fullName }"
        />
        <span class="error-text" v-if="errors.billing.fullName">{{ errors.billing.fullName }}</span>
      </div>

      <div class="form-row">
        <div class="form-group">
            <label for="nif">NIF/CIF</label>
            <input 
                type="text" 
                id="nif" 
                v-model="billingData.nif" 
                placeholder="12345678A" 
                class="form-control"
                :class="{ 'is-invalid': errors.billing.nif }"
            />
            <span class="error-text" v-if="errors.billing.nif">{{ errors.billing.nif }}</span>
        </div>
         <div class="form-group">
            <label for="phone">Teléfono</label>
            <input 
                type="tel" 
                id="phone" 
                v-model="billingData.phone" 
                placeholder="600123456" 
                class="form-control"
                :class="{ 'is-invalid': errors.billing.phone }"
            />
            <span class="error-text" v-if="errors.billing.phone">{{ errors.billing.phone }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input 
            type="email" 
            id="email" 
            v-model="billingData.email" 
            placeholder="ejemplo@correo.com" 
            class="form-control"
            :class="{ 'is-invalid': errors.billing.email }"
        />
        <span class="error-text" v-if="errors.billing.email">{{ errors.billing.email }}</span>
      </div>

      <div class="form-group">
        <label for="address">Dirección</label>
        <input 
            type="text" 
            id="address" 
            v-model="billingData.address" 
            class="form-control"
            :class="{ 'is-invalid': errors.billing.address }"
        />
        <span class="error-text" v-if="errors.billing.address">{{ errors.billing.address }}</span>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="postalCode">Código Postal</label>
          <input 
            type="text" 
            id="postalCode" 
            v-model="billingData.postalCode" 
            class="form-control"
            :class="{ 'is-invalid': errors.billing.postalCode }"
            />
          <span class="error-text" v-if="errors.billing.postalCode">{{ errors.billing.postalCode }}</span>
        </div>
        <div class="form-group">
           <label for="city">Ciudad</label>
           <input 
            type="text" 
            id="city" 
            v-model="billingData.city" 
            class="form-control"
            :class="{ 'is-invalid': errors.billing.city }"
            />
           <span class="error-text" v-if="errors.billing.city">{{ errors.billing.city }}</span>
        </div>
      </div>
      
       <div class="form-row">
        <div class="form-group">
          <label for="province">Provincia</label>
          <input type="text" id="province" v-model="billingData.province" class="form-control" />
        </div>
        <div class="form-group">
           <label for="country">País</label>
           <select id="country" v-model="billingData.country" class="form-control">
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
.step-heading {
  margin-bottom: 1.5rem;
  color: var(--color-primary);
  font-weight: 600;
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
</style>
