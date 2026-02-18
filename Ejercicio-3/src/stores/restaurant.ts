import { defineStore } from 'pinia';
import type { RestaurantStoreState, Reservation, TimeSlot } from '../types';

export const useRestaurantStore = defineStore('restaurant', {
  state: (): RestaurantStoreState => ({
    tables: [
      { id: 1, label: 'Mesa 1', capacity: 2, position: { x: 50, y: 50 } },
      { id: 2, label: 'Mesa 2', capacity: 4, position: { x: 200, y: 50 } },
      { id: 3, label: 'Mesa 3', capacity: 6, position: { x: 350, y: 50 } },
      { id: 4, label: 'Mesa 4', capacity: 2, position: { x: 50, y: 200 } },
      { id: 5, label: 'Mesa 5', capacity: 4, position: { x: 200, y: 200 } },
      { id: 6, label: 'Mesa 6', capacity: 1, position: { x: 350, y: 200 } },
      { id: 7, label: 'Mesa 7', capacity: 1, position: { x: 50, y: 350 } },
      { id: 8, label: 'Mesa 8', capacity: 2, position: { x: 200, y: 350 } },
      { id: 9, label: 'Barra', capacity: 1, position: { x: 350, y: 350 } },
    ],
    reservations: [],
    activeTimeSlot: '13:00', // Default
  }),
  getters: {
    isTableAvailable: (state) => (tableId: number) => {
      return !state.reservations.some(
        (res) => res.tableId === tableId && res.timeSlot === state.activeTimeSlot
      );
    },
    // Helper to see if a table is occupied at current slot
    getTableStatus: (state) => (tableId: number) => {
      const isReserved = state.reservations.some(
        (res) => res.tableId === tableId && res.timeSlot === state.activeTimeSlot
      );
      return isReserved ? 'occupied' : 'free';
    }
  },
  actions: {
    setTimeSlot(slot: TimeSlot) {
      this.activeTimeSlot = slot;
    },
    addReservation(reservation: Omit<Reservation, 'id'>) {
      // Validation: Check if table exists
      const table = this.tables.find((t) => t.id === reservation.tableId);
      if (!table) {
        throw new Error(`Table ${reservation.tableId} does not exist`);
      }

      // Validation: Check capacity
      if (reservation.peopleCount > table.capacity) {
        throw new Error(`Exceeds table capacity`);
      }

      // Validation: Check availability
      if (!this.isTableAvailable(reservation.tableId)) {
        throw new Error(`Table ${reservation.tableId} is already reserved at ${this.activeTimeSlot}`);
      }
      
      // Ensure the reservation time matches active slot (or passed in params)
      // Requirement says: "valida que la mesa esté libre a esa hora".
      // Assuming reservation comes with timeSlot or uses active?
      // "Actions: addReservation(...): Recibe datos...".
      // Let's assume it receives the full reservation object minus ID.
      // But we should verify `reservation.timeSlot` matches `activeTimeSlot`? 
      // Or maybe the reservation is ALWAYS for the `activeTimeSlot`?
      // Requirement: "timeSlot: La hora seleccionada actualmente (ej: '14:00')".
      // So we use `this.activeTimeSlot` for the new reservation?
      // The `Reservation` type has `timeSlot`.
      // I'll assume we use the one passed in `reservation`, but validity check against existing reservations.
      
      const newReservation: Reservation = {
        ...reservation,
        id: crypto.randomUUID(),
        // timeSlot: this.activeTimeSlot // Use active time slot? or the one in the object?
        // If the form submits data, it likely uses the active slot.
        // I'll ensure consistency.
      };

      // Double check availability for the SPECIFIC slot in reservation
      const isConflict = this.reservations.some(
        (res) => res.tableId === newReservation.tableId && res.timeSlot === newReservation.timeSlot
      );
      
      if (isConflict) {
        throw new Error(`Table ${newReservation.tableId} is already reserved at ${newReservation.timeSlot}`);
      }

      this.reservations.push(newReservation);
    }
  },
});
