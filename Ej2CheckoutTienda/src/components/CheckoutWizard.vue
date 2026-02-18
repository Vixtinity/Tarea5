<script setup lang="ts">
import { useCheckout } from '@/composables/useCheckout'
import StepBilling from './StepBilling.vue'
import StepShipping from './StepShipping.vue'
import StepPayment from './StepPayment.vue'
import StepConfirmation from './StepConfirmation.vue'

const { currentStep, steps, nextStep, prevStep } = useCheckout()
</script>

<template>
  <div class="checkout-wizard">
    <div class="steps-indicator">
      <div 
        v-for="step in steps" 
        :key="step.id"
        class="step-item"
        :class="{ active: step.id === currentStep, completed: step.id < currentStep }"
      >
        <span class="step-number">{{ step.id }}</span>
        <span class="step-title">{{ step.title }}</span>
      </div>
    </div>

    <div class="step-content">
      <StepBilling v-if="currentStep === 1" />
      <StepShipping v-if="currentStep === 2" />
      <StepPayment v-if="currentStep === 3" />
      <StepConfirmation v-if="currentStep === 4" />
    </div>

    <div class="actions">
      <button @click="prevStep" :disabled="currentStep === 1">Anterior</button>
      <button @click="nextStep" :disabled="currentStep === steps.length">Siguiente</button>
    </div>
  </div>
</template>

<style scoped>
.checkout-wizard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.steps-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.5;
}

.step-item.active, .step-item.completed {
  opacity: 1;
  font-weight: bold;
}

.step-content {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
}

.actions {
  display: flex;
  justify-content: space-between;
}
</style>
