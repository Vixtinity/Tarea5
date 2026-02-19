# Documentación de Componentes

## Table.vue

Componente visual que representa una mesa en el mapa.

### Props

| Prop     | Tipo                                 | Descripción                                                  |
| -------- | ------------------------------------ | ------------------------------------------------------------ |
| `table`  | `Table`                              | Objeto con datos de la mesa (id, label, capacity, position). |
| `status` | `'free' \| 'occupied' \| 'selected'` | Estado visual de la mesa.                                    |

### Eventos

- `click(id: number)`: Se emite al hacer clic en la mesa (incluso si está ocupada, aunque la lógica padre puede ignorarlo).

### Accesibilidad

- Renderiza un `<button>`.
- Usa `aria-label` dinámico describiendo estado y capacidad.
- `aria-disabled="true"` si el estado es `occupied`.

---

## ReservationForm.vue

Formulario para crear una nueva reserva.

### Props

| Prop            | Tipo    | Descripción                              |
| --------------- | ------- | ---------------------------------------- |
| `selectedTable` | `Table` | La mesa que se está intentando reservar. |

### Eventos

- `submit(payload)`: Se emite cuando el formulario es válido y se envía.
  - `payload`: `{ customerName: string, email: string, peopleCount: number }`

### Validaciones

- **Nombre/Email**: Requeridos. Formato de email simple.
- **Comensales**: Debe ser > 0 y <= `selectedTable.capacity`.
