<script setup lang="ts">
import { useRestaurantStore } from '../stores/restaurant';
import TableItem from './Table.vue';
import type { Table } from '../types';

defineProps<{
  selectedTableId: number | null;
}>();

const emit = defineEmits<{
  (e: 'select', table: Table): void;
}>();

const store = useRestaurantStore();

function getTableStatus(table: Table, selectedId: number | null): 'free' | 'occupied' | 'selected' {
  if (selectedId === table.id) {
    return 'selected';
  }
  // Check store for occupation
  const isOccupied = store.getTableStatus(table.id) === 'occupied';
  return isOccupied ? 'occupied' : 'free';
}

function handleTableClick(table: Table) {
  const status = store.getTableStatus(table.id);
  if (status === 'occupied') return;
  
  emit('select', table);
}
</script>

<template>
  <div class="table-map">
    <div class="map-container">
      <TableItem
        v-for="table in store.tables"
        :key="table.id"
        :table="table"
        :status="getTableStatus(table, selectedTableId)"
        @click="handleTableClick(table)"
      />
    </div>
  </div>
</template>

<style scoped>
.table-map {
  width: 100%;
  max-width: 550px;
  height: 500px;
  background-color: var(--bg-card);
  border: 2px dashed var(--border-color);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
}

.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
