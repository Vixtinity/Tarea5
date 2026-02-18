<script setup lang="ts">
import { onMounted } from 'vue'
import '../assets/formularioeventos.css'

// Importación de componentes reutilizables
import FormInput from '../components/FormInput.vue'
import FormSelect from '../components/FormSelect.vue'
import FormCheckbox from '../components/FormCheckbox.vue'
import FormRadio from '../components/FormRadio.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

// Importación de lógica (Composables y Utils)
import { useFormState } from '../composables/useFormState'
import { useValidation } from '../composables/useValidation'
import { getMinMaxDates } from '../utils/validators'

// Inicialización de estados y validaciones
const { formulario } = useFormState()
const { errores, formularioInvalido } = useValidation(formulario)
const { min, max } = getMinMaxDates()

// Opciones para el Select
const opcionesEvento = [
  { value: 'boda', text: 'Boda' },
  { value: 'cumpleaños', text: 'Cumpleaños' },
  { value: 'Corporativo', text: 'Corporativo' },
  { value: 'conferencia', text: 'Conferencia' },
  { value: 'otro', text: 'Otro' }
]

// Lógica de envío
const enviarFormulario = () => {
  if (formularioInvalido.value) {
    alert('Por favor, revisa los errores en el formulario antes de enviar.')
    return
  }

  console.log('Formulario enviado con éxito:', formulario)
  alert('¡Formulario enviado!')
}
</script>

<template>
  <form id="formEvento" @submit.prevent="enviarFormulario">
    
    <fieldset>
      <legend>Datos personales</legend>

      <FormInput 
        label="Nombre" 
        v-model="formulario.nombre" 
        type="text" 
        required 
      />
      <ErrorMessage :mensaje="errores.nombre" />

      <FormInput 
        label="NIF" 
        v-model="formulario.nif" 
        type="text" 
        required 
      />
      <ErrorMessage :mensaje="errores.nif" />

      <FormInput 
        label="Teléfono" 
        v-model="formulario.telefono" 
        type="tel" 
      />
      <ErrorMessage :mensaje="errores.telefono" />

      <FormInput 
        label="Email" 
        v-model="formulario.email" 
        type="email" 
      />
      <ErrorMessage :mensaje="errores.email" />
    </fieldset>

    <fieldset>
      <legend>Detalles del evento</legend>

      <FormSelect 
        label="Tipo de Evento"
        v-model="formulario.tipoEvento"
        :options="opcionesEvento"
        required
      />

      <FormInput 
        label="Fecha" 
        v-model="formulario.fechaEvento" 
        type="date" 
        :min="min" 
        :max="max" 
      />

      <FormInput 
        label="Hora" 
        v-model="formulario.horaInicio" 
        type="time" 
        min="08:00" 
        max="23:00" 
        required 
      />

      <div class="asistentes-control">
        <FormInput 
          label="Asistentes" 
          v-model="formulario.asistentesNumber" 
          type="number" 
          min="10" 
          max="500" 
        />
        <input type="range" v-model="formulario.asistentesNumber" min="10" max="500" />
      </div>
    </fieldset>

    <fieldset id="Extra">
      <legend>Extras</legend>

      <strong>CATERING:</strong><br>
      <FormCheckbox label="Vegetariano" v-model="formulario.catering" value="Menu_vegetariano" />
      <FormCheckbox label="Vegano" v-model="formulario.catering" value="Menu_vegano" />
      <FormCheckbox label="Barra libre" v-model="formulario.catering" value="Barra_libre" />
      <FormCheckbox label="Infantil" v-model="formulario.catering" value="Catering_infantil" />
      <FormCheckbox label="Café" v-model="formulario.catering" value="Servicio_cafe" />

      <br><br>

      <strong>PRESUPUESTO:</strong><br>
      <FormRadio label="Económico" v-model="formulario.presupuesto" value="economico" required />
      <FormRadio label="Estándar" v-model="formulario.presupuesto" value="estandar" />
      <FormRadio label="Premium" v-model="formulario.presupuesto" value="premium" />
      <FormRadio label="Luxury" v-model="formulario.presupuesto" value="luxury" />

      <br><br>

      <strong>COMENTARIO:</strong><br>
      <textarea v-model="formulario.comentario" maxlength="500" rows="5"></textarea>
      <ErrorMessage :mensaje="errores.comentario" />
      <p>Caracteres: {{ formulario.comentario.length }} / 500</p>

      <br>
      <FormCheckbox label="Acepta los términos" v-model="formulario.terminos" required />
    </fieldset>

    <div class="form-actions">
      <button type="submit" :disabled="formularioInvalido">Enviar solicitud</button>
      <button type="reset">Borrar todo</button>
    </div>

  </form>
</template>

<style scoped>
/* Puedes mover aquí estilos específicos si no están en formularioeventos.css */
.asistentes-control {
  margin: 1rem 0;
}
.form-actions {
  margin-top: 2rem;
  display: flex;
  gap: 10px;
}
</style>