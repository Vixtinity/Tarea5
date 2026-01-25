<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import '../assets/formularioeventos.css'
import FormularioEventos from '@/views/FormularioEventos.vue'

const formulario = reactive({
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
  comentario: ''
})

const errores = reactive({
  nombre: '',
  nif: '',
  telefono: '',
  email: '',
  comentario: ''
})

const rNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/
const rNif = /^[0-9]{8}[A-Z]$|^[XYZ][0-9]{7}[A-Z]$/
const rTelefono = /^[679][0-9]{8}$/
const rEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const rComentario = /^(?!\s*$).+/

const enviarFormulario = (event: Event) => {
  event.preventDefault();

  focoNombre();
  focoNif();
  focoTelefono();
  focoEmail();
  focoComentario();

  if (formularioInvalido.value == true) {
    alert('Por favor, revisa los errores en el formulario antes de enviar.');
    return;
  }

  // Si todo está correcto
  console.log('Formulario enviado con éxito:', formulario);
  alert('¡Formulario enviado!');
};

function focoNombre() {
  if (!formulario.nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio'
    return false
  }
}

function focoNif() {
  if (!formulario.nif.trim()) {
    errores.nif = 'El NIF es obligatorio'
    return false
  }
}

const formularioInvalido = computed(() => {
  return (
    errores.nombre !== 'Correcto' ||
    errores.nif !== 'Correcto' ||
    errores.telefono !== 'Correcto' ||
    errores.email !== 'Correcto' ||
    (errores.comentario !== 'Correcto' && formulario.comentario !== '')
  )
})

function focoTelefono() {
  if (!formulario.telefono.trim()) {
    errores.telefono = 'El teléfono es obligatorio'
    return false
  }
}

function focoEmail() {
  if (!formulario.email.trim()) {
    errores.email = 'El email es obligatorio'
    return false
  }
}

function focoComentario() {
  if (
    formulario.comentario && (!rComentario.test(formulario.comentario) || formulario.comentario.length > 500)) {
    errores.comentario = 'Comentario no válido'
    return false
    }
}

const hoy = new Date()
const minFecha = new Date(hoy)
minFecha.setDate(hoy.getDate() + 7)
const min = minFecha.toISOString().split('T')[0]

const maxFecha = new Date(hoy)
maxFecha.setFullYear(hoy.getFullYear() + 1)
const max = maxFecha.toISOString().split('T')[0]


watch(() => formulario.nombre, v => {
errores.nombre = rNombre.test(v) ? 'Correcto' : 'Invalido'
})

watch(() => formulario.nif, v => {
  errores.nif = rNif.test(v) ? 'Correcto' : 'Invalido'
})

watch(() => formulario.telefono, v => {
  errores.telefono = rTelefono.test(v) ? 'Correcto' : 'Invalido'
})

watch(() => formulario.email, v => {
  errores.email = rEmail.test(v) ? 'Correcto' : 'Invalido'
})

watch(() => formulario.comentario, v => {
  errores.comentario =
    v === '' || (rComentario.test(v) && v.length <= 500)
      ? 'Correcto'
      : 'Invalido'
})
</script>


<template>

<form id="formEvento">

  <fieldset>
    <legend>Datos personales</legend>

    <label>Nombre</label>
    <input type="text" @blur="focoNombre" v-model="formulario.nombre" required />
    <small style="color:red">{{ errores.nombre }}</small>
    <br>

    <label>NIF</label>
    <input type="text" @blur="focoNif" v-model="formulario.nif" required />
    <small style="color:red">{{ errores.nif }}</small>
    <br>

    <label>Teléfono</label>
    <input type="tel" @blur="focoTelefono" v-model="formulario.telefono"/>
    <small style="color:red">{{ errores.telefono }}</small>
    <br>
    <label>Email</label>
    <input type="email" @blur="focoEmail" v-model="formulario.email"/>
    <small style="color:red">{{ errores.email }}</small>
  </fieldset>

  <fieldset>
    <legend>Detalles del evento</legend>

    <label>Tipo</label>
    <select v-model="formulario.tipoEvento" required>
      <option value="">Selecciona</option>
      <option value="boda">Boda</option>
      <option value="cumpleaños">Cumpleaños</option>
      <option value="Corporativo">Corporativo</option>
      <option value="conferencia">Conferencia</option>
      <option value="otro">Otro</option>
    </select>

    <br>

    <label>Fecha</label>
    <input type="date" v-model="formulario.fechaEvento" :min="min" :max="max"/>

    <br>

    <label>Hora</label>
    <input type="time" v-model="formulario.horaInicio" min="08:00" max="23:00" required/>

    <br>

    <label>Asistentes</label>
    <input type="number" v-model="formulario.asistentesNumber" min="10" max="500"/>
    <input type="range" v-model="formulario.asistentesNumber" min="10" max="500" />
  </fieldset>

  <fieldset id="Extra">
    <legend>Extras</legend>

    <strong>CATERING:</strong><br>
    <label><input type="checkbox" v-model="formulario.catering" value="Menu_vegetariano"> Vegetariano</label><br>
    <label><input type="checkbox" v-model="formulario.catering" value="Menu_vegano"> Vegano</label><br>
    <label><input type="checkbox" v-model="formulario.catering" value="Barra_libre"> Barra libre</label><br>
    <label><input type="checkbox" v-model="formulario.catering" value="Catering_infantil"> Infantil</label><br>
    <label><input type="checkbox" v-model="formulario.catering" value="Servicio_cafe"> Café</label><br>

    <br>

    <strong>PRESUPUESTO:</strong><br>
    <label><input type="radio" v-model="formulario.presupuesto" value="economico" required> Económico</label><br>
    <label><input type="radio" v-model="formulario.presupuesto" value="estandar"> Estándar</label><br>
    <label><input type="radio" v-model="formulario.presupuesto" value="premium"> Premium</label><br>
    <label><input type="radio" v-model="formulario.presupuesto" value="luxury"> Luxury</label><br>

    <br>

    <strong>COMENTARIO:</strong><br>
    <textarea v-model="formulario.comentario" maxlength="500" rows="5"></textarea>
    <small style="color:red">{{ errores.comentario }}</small>
    <p>Caracteres: {{formulario.comentario.length }}</p>
    <br>

    <input type="checkbox" required> Acepta los términos
  </fieldset>

  <button type="submit" @submit.prevent="enviarFormulario" :disabled="formularioInvalido" >Enviar solicitud</button>
  <button type="reset">Borrar todo</button>

</form>

</template>
