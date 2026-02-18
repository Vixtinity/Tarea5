import { reactive, computed, watch } from 'vue';
import { rNombre, rNif, rTelefono, rEmail, rComentario } from '../utils/regex';
import type { FormularioData, ErroresFormulario } from '../types/reservation';

export function useValidation(formulario: FormularioData) {
  const errores = reactive<ErroresFormulario>({
    nombre: '',
    nif: '',
    telefono: '',
    email: '',
    comentario: ''
  });

  // Watchers de validación
  watch(() => formulario.nombre, v => errores.nombre = rNombre.test(v) ? 'Correcto' : 'Invalido');
  watch(() => formulario.nif, v => errores.nif = rNif.test(v) ? 'Correcto' : 'Invalido');
  watch(() => formulario.telefono, v => errores.telefono = rTelefono.test(v) ? 'Correcto' : 'Invalido');
  watch(() => formulario.email, v => errores.email = rEmail.test(v) ? 'Correcto' : 'Invalido');
  watch(() => formulario.comentario, v => {
    errores.comentario = v === '' || (rComentario.test(v) && v.length <= 500) ? 'Correcto' : 'Invalido';
  });

  const formularioInvalido = computed(() => {
    return errores.nombre !== 'Correcto' || 
           errores.nif !== 'Correcto' || 
           errores.telefono !== 'Correcto' || 
           errores.email !== 'Correcto';
  });

  return { errores, formularioInvalido };
}