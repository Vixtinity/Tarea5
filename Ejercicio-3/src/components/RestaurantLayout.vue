<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRestaurantStore } from '../stores/restaurant';
import TableMap from './TableMap.vue';
import ReservationForm from './ReservationForm.vue';
import type { Table, Reservation } from '../types';

const store = useRestaurantStore();
const selectedTableId = ref<number | null>(null);

const selectedTable = computed(() => {
  if (selectedTableId.value === null) return null;
  return store.tables.find(t => t.id === selectedTableId.value) || null;
});

function handleSelect(table: Table) {
  // Toggle selection or select new
  if (selectedTableId.value === table.id) {
    selectedTableId.value = null;
  } else {
    selectedTableId.value = table.id;
  }
}

function handleSubmit(reservationData: Omit<Reservation, 'id' | 'tableId' | 'timeSlot'>) {
  if (!selectedTableId.value) return;

  try {
    store.addReservation({
      ...reservationData,
      tableId: selectedTableId.value,
      timeSlot: store.activeTimeSlot,
    });
    
    alert('Reserva confirmada con éxito!');
    selectedTableId.value = null; // Deselect after success
  } catch (error) {
    alert(`Error al reservar: ${error}`);
  }
}
</script>

<template>
  <div class="restaurant-layout">
    <div class="map-section">
      <TableMap 
        :selected-table-id="selectedTableId" 
        @select="handleSelect" 
      />
      <p class="instruction">Selecciona una mesa libre para reservar.</p>
    </div>
    
    <div class="form-section">
      <ReservationForm 
        v-if="selectedTable" 
        :selected-table="selectedTable" 
        @submit="handleSubmit" 
      />
      <div v-else class="empty-state">
        <p>👈 Selecciona una mesa en el mapa</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.restaurant-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}

@media (min-width: 900px) {
  .restaurant-layout {
    flex-direction: row;
    align-items: flex-start;
    gap: 3rem;
  }
}

.map-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-section {
  flex: 1;
  display: flex;
  justify-content: center;
  width: 100%;
}

.instruction {
  margin-top: 1rem;
  color: var(--text-muted);
  text-align: center;
  font-size: 0.95rem;
}

.empty-state {
  padding: 3rem;
  background: var(--bg-card);
  border: 2px dashed var(--border-color);
  border-radius: var(--radius);
  color: var(--text-muted);
  text-align: center;
  font-style: italic;
  width: 100%;
  max-width: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
