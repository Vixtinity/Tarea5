<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { Table, Reservation } from '../types';

const props = defineProps<{
  selectedTable: Table;
}>();

const emit = defineEmits<{
  (e: 'submit', reservation: Omit<Reservation, 'id' | 'timeSlot' | 'tableId'>): void;
  // Actually, we should probably emit the full partial reservation or just the form fields.
  // The store needs tableId and timeSlot, which are known context.
  // We'll emit the form fields: customerName, email, peopleCount.
}>();

const formData = ref({
  customerName: '',
  email: '',
  peopleCount: 1, // Default 1
});

const errors = ref({
  customerName: '',
  email: '',
  peopleCount: '',
});

// Reset form when table changes
watch(() => props.selectedTable.id, () => {
  formData.value = {
    customerName: '',
    email: '',
    peopleCount: 1,
  };
  errors.value = { customerName: '', email: '', peopleCount: '' };
});

const isValid = computed(() => {
  return !errors.value.customerName && !errors.value.email && !errors.value.peopleCount;
});

function validate() {
  let valid = true;
  errors.value = { customerName: '', email: '', peopleCount: '' };

  if (!formData.value.customerName.trim()) {
    errors.value.customerName = 'El nombre es obligatorio.';
    valid = false;
  }

  if (!formData.value.email.trim()) {
    errors.value.email = 'El email es obligatorio.';
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = 'Email inválido.';
    valid = false;
  }

  if (formData.value.peopleCount <= 0) {
    errors.value.peopleCount = 'Debe haber al menos 1 persona.';
    valid = false;
  } else if (formData.value.peopleCount > props.selectedTable.capacity) {
    errors.value.peopleCount = `Máximo ${props.selectedTable.capacity} personas para esta mesa.`;
    valid = false;
  }

  return valid;
}

function handleSubmit() {
  if (validate()) {
    emit('submit', {
      customerName: formData.value.customerName,
      email: formData.value.email,
      peopleCount: formData.value.peopleCount,
    });
  }
}
</script>

<template>
  <div class="reservation-form">
    <h3>Reservar Mesa {{ selectedTable.label }}</h3>
    <form @submit.prevent="handleSubmit" novalidate>
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input
          id="name"
          v-model="formData.customerName"
          type="text"
          :aria-invalid="!!errors.customerName"
          :aria-describedby="errors.customerName ? 'name-error' : undefined"
        />
        <span v-if="errors.customerName" id="name-error" class="error">{{ errors.customerName }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          :aria-invalid="!!errors.email"
          :aria-describedby="errors.email ? 'email-error' : undefined"
        />
        <span v-if="errors.email" id="email-error" class="error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="people">Comensales (Máx {{ selectedTable.capacity }}):</label>
        <input
          id="people"
          v-model.number="formData.peopleCount"
          type="number"
          min="1"
          :max="selectedTable.capacity"
          :aria-invalid="!!errors.peopleCount"
          :aria-describedby="errors.peopleCount ? 'people-error' : undefined"
        />
        <span v-if="errors.peopleCount" id="people-error" class="error">{{ errors.peopleCount }}</span>
      </div>

      <button type="submit" class="submit-btn" :disabled="!isValid && false" >
        Confirmar Reserva
      </button>
    </form>
  </div>
</template>

<style scoped>
.reservation-form {
  padding: 2rem;
  background: var(--bg-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  width: 100%;
  max-width: 450px;
  border: 1px solid var(--border-color);
}

h3 {
  margin-bottom: 1.5rem;
  color: var(--text-main);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.form-group {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--secondary-color);
  font-size: 0.95rem;
}

input {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  background-color: var(--bg-input);
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

input[aria-invalid="true"] {
  border-color: var(--danger-color);
}

.error {
  color: var(--danger-color);
  font-size: 0.85rem;
  margin-top: 0.35rem;
}

.submit-btn {
  width: 100%;
  padding: 0.875rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: var(--primary-hover);
}

.submit-btn:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
  opacity: 0.7;
}

.submit-btn:focus-visible {
  outline: 2px solid var(--secondary-color);
  outline-offset: 2px;
}
</style>
