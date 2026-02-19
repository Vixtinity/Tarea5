import { setActivePinia, createPinia } from 'pinia';
import { useRestaurantStore } from '../src/stores/restaurant';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Restaurant Store - Business Logic', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Test A: Evitar Overbooking', () => {
    const store = useRestaurantStore();

    // 1. Cargar el Store y definir que la Mesa 1 está reservada a las 14:00.
    store.activeTimeSlot = '14:00';
    store.addReservation({
      tableId: 1,
      timeSlot: '14:00',
      customerName: 'Cliente Existente',
      email: 'existente@test.com',
      peopleCount: 2
    });

    // Verify initial state
    expect(store.reservations.length).toBe(1);

    // 2. Intentar lanzar la acción addReservation para la Mesa 1 a las 14:00 de nuevo.
    // 3. Expectativa: El sistema debe lanzar un error o devolver false.
    expect(() => {
      store.addReservation({
        tableId: 1,
        timeSlot: '14:00',
        customerName: 'Cliente Intruso',
        email: 'intruso@test.com',
        peopleCount: 2
      });
    }).toThrow(/already reserved/);

    // Y el contador de reservas no debe aumentar.
    expect(store.reservations.length).toBe(1);
  });
});
