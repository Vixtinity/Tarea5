<script setup lang="ts">
import { computed } from 'vue';
import type { Table } from '../types';

// Props definition
const props = defineProps<{
  table: Table;
  status: 'free' | 'occupied' | 'selected';
  isSelected?: boolean; // 'selected' status might overlap with this, but strictly following prompt: status: Libre (verde), Ocupada (rojo) o Seleccionada (azul).
}>();

const emit = defineEmits<{
  (e: 'click', id: number): void;
}>();

// Computed classes based on status
const statusClass = computed(() => {
  switch (props.status) {
    case 'free': return 'status-free';
    case 'occupied': return 'status-occupied';
    case 'selected': return 'status-selected';
    default: return 'status-free';
  }
});

// Accessible label
const ariaLabel = computed(() => {
  const statusText = props.status === 'free' ? 'Libre' : props.status === 'occupied' ? 'Ocupada' : 'Seleccionada';
  return `Mesa ${props.table.label}, capacidad para ${props.table.capacity} personas, estado: ${statusText}`;
});

function handleClick() {
  emit('click', props.table.id);
}
</script>

<template>
  <button
    class="table-item"
    :class="statusClass"
    :style="{ left: `${props.table.position.x}px`, top: `${props.table.position.y}px` }"
    @click="handleClick"
    :aria-label="ariaLabel"
    :aria-disabled="status === 'occupied'"
    type="button"
  >
    <span class="table-label">{{ table.label }}</span>
    <span class="table-capacity">👥 {{ table.capacity }}</span>
  </button>
</template>

<style scoped>
.table-item {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
  color: var(--text-main);
}

.table-label {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.table-capacity {
  font-size: 0.85rem;
  opacity: 0.9;
}

.table-item:focus-visible {
  outline: 3px solid var(--text-main);
  outline-offset: 4px;
  z-index: 10;
}

/* Estado: Libre */
.status-free {
  background-color: white;
  border-color: var(--success-color);
  color: var(--success-color);
}

.status-free:hover {
  background-color: var(--success-bg);
  transform: scale(1.02);
}

/* Estado: Ocupada */
.status-occupied {
  background-color: #e5e7eb; /* Gray-200 */
  border-color: #9ca3af;     /* Gray-400 */
  color: #6b7280;            /* Gray-500 */
  cursor: not-allowed;
  opacity: 0.9;
}

/* Estado: Seleccionada */
.status-selected {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
  z-index: 5;
}
</style>
