import { reactive } from 'vue';
import type { FormularioData } from '../types/reservation';

export function useFormState() {
  const formulario = reactive<FormularioData>({
    nombre: '',
    nif: '',
    telefono: '',
    email: '',
    tipoEvento: '',
    fechaEvento: '',
    horaInicio: '',
    asistentesNumber: 10,
    catering: [],
    presupuesto: '',
    comentario: '',
    terminos: false
  });

  return { formulario };
}