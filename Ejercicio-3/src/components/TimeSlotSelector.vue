<script setup lang="ts">
import { useRestaurantStore } from '../stores/restaurant';
import type { TimeSlot } from '../types';

const store = useRestaurantStore();
const timeSlots: TimeSlot[] = ['13:00', '14:00', '15:00', '20:00', '21:00'];
</script>

<template>
  <div class="time-slot-selector">
    <h2>Selecciona una hora:</h2>
    <div class="slots">
      <button
        v-for="slot in timeSlots"
        :key="slot"
        :class="{ active: store.activeTimeSlot === slot }"
        @click="store.setTimeSlot(slot)"
        :aria-current="store.activeTimeSlot === slot ? 'time' : undefined"
      >
        {{ slot }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.time-slot-selector {
  margin-bottom: 2rem;
  text-align: center;
}

h2 {
  font-size: 1.25rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.slots {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

button {
  padding: 0.5rem 1.5rem;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-main);
  cursor: pointer;
  border-radius: 9999px; /* Pill shape */
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

button:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
  transform: translateY(-1px);
}

button:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

button.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
}
</style>
