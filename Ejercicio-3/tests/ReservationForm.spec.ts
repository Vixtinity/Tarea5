import { mount } from '@vue/test-utils';
import ReservationForm from '../src/components/ReservationForm.vue';
import { describe, it, expect } from 'vitest';

describe('ReservationForm - Validation', () => {
  const selectedTable = { id: 1, label: '1', capacity: 2, position: { x: 0, y: 0 } };

  it('Test C: Validación de Formulario', async () => {
    // 1. Montar el formulario indicando que la mesa seleccionada tiene capacidad para 2 personas.
    const wrapper = mount(ReservationForm, {
      props: {
        selectedTable
      }
    });

    // 2. Rellenar el input de comensales con el valor "5".
    const inputPeople = wrapper.find('input#people');
    await inputPeople.setValue(5);
    
    // Fill other required fields to isolate the people count failure
    await wrapper.find('input#name').setValue('Juan');
    await wrapper.find('input#email').setValue('juan@test.com');

    // 3. Simular el envío del formulario.
    await wrapper.find('form').trigger('submit');

    // 4. Expectativa: El evento de envío NO debe haberse emitido.
    expect(wrapper.emitted('submit')).toBeFalsy();

    // Debe aparecer un mensaje de error en el DOM.
    expect(wrapper.text()).toContain('Máximo 2 personas');
  });
});
