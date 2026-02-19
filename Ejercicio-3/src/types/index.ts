export type TimeSlot = '13:00' | '14:00' | '15:00' | '20:00' | '21:00';

export interface Position {
  x: number;
  y: number;
}

export interface Table {
  id: number;
  label: string;
  capacity: number;
  position: Position;
}

export interface Reservation {
  id: string;
  tableId: number;
  timeSlot: TimeSlot;
  customerName: string;
  email: string; // Added email field as per requirement (ReservatinForm)
  peopleCount: number;
}

export interface RestaurantStoreState {
  tables: Table[];
  reservations: Reservation[];
  activeTimeSlot: TimeSlot; // Changed from 'timeSlot' to match diagram/props logic if needed, but requirements said 'timeSlot'. Let's stick to spec: 'timeSlot'.
  // Diagram said 'activeTimeSlot', text said 'timeSlot'. I'll use activeTimeSlot for clarity or match text.
  // Text: "timeSlot: La hora seleccionada actualmente".
  // Diagram: "+string activeTimeSlot".
  // I will use `activeTimeSlot` to avoid confusion with the type `TimeSlot`.
}
