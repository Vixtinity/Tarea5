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
        <div class="step-circle">
          <span v-if="step.id < currentStep">✓</span>
          <span v-else>{{ step.id }}</span>
        </div>
        <span class="step-title">{{ step.title }}</span>
        <div class="step-line" v-if="step.id < steps.length"></div>
      </div>
    </div>

    <div class="step-content card">
      <StepBilling v-if="currentStep === 1" />
      <StepShipping v-if="currentStep === 2" />
      <StepPayment v-if="currentStep === 3" />
      <StepConfirmation v-if="currentStep === 4" />
    </div>

    <div class="actions">
      <button 
        class="btn btn-secondary" 
        @click="prevStep" 
        :disabled="currentStep === 1"
      >
        Anterior
      </button>
      <button 
        class="btn btn-primary" 
        @click="nextStep" 
        :disabled="currentStep === steps.length"
      >
        {{ currentStep === steps.length ? 'Confirmar Pedido' : 'Siguiente' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.checkout-wizard {
  max-width: 800px;
  margin: 0 auto;
}

.steps-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  z-index: 1;
}

.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-surface);
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--color-text-muted);
  transition: all 0.3s;
  margin-bottom: 0.5rem;
}

.step-title {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.step-line {
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  height: 2px;
  background-color: var(--color-border);
  z-index: -1;
  transform: translateY(-50%);
}

.step-item:last-child .step-line {
  display: none;
}

/* Active & Completed States */
.step-item.active .step-circle {
  border-color: var(--color-accent);
  color: var(--color-accent);
  box-shadow: 0 0 0 4px var(--color-surface-muted);
}
.step-item.active .step-title {
  color: var(--color-accent);
  font-weight: bold;
}

.step-item.completed .step-circle {
  background-color: var(--color-success);
  border-color: var(--color-success);
  color: white;
}
.step-item.completed .step-title {
  color: var(--color-success);
}
.step-item.completed .step-line {
  background-color: var(--color-success);
}

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}
.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
}

.btn-secondary {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-main);
}
.btn-secondary:hover:not(:disabled) {
  background-color: var(--color-surface-muted);
}
</style>
