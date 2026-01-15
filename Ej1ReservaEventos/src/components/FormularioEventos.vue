<script setup lang="ts">
import { reactive, ref } from 'vue';

const formulario = reactive({
  nombre: '',
  nif: '',
  telefono: '',
  email: '',
  tipoEvento: '',
  fechaEvento: '',
  horaInicio: '',
  asistentesNumber: 10,
})




</script>

<template>
  <form id="formEvento">

  <fieldset>
    <legend>Datos personales</legend>

    <label for="nombre">Nombre completo</label>
    <input type="text" id="nombre" name="nombre"placeholder="Nombre y apellidos"/>
    <br>
    <label for="nif">NIF / NIE</label>
    <input type="text" id="nif" name="nif" placeholder="12345678A o X1234567B"/>
    <br>
    <label for="telefono">
      Teléfono móvil
    </label>
    <input
      type="tel"
      id="telefono"
      name="telefono"
      placeholder="600123456"
    />
    <br>
    <label for="email">
      Email
    </label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="correo@ejemplo.com"
    />
    <br>
  </fieldset>

  <fieldset>
    <legend>Detalles del evento</legend>

    <label for="tipoEvento">
      Tipo de evento
    </label>
    <select id="tipoEvento" name="tipoEvento">
      <option value="">-- Selecciona una opción --</option>
      <option value="boda">Boda</option>
      <option value="cumpleanos">Cumpleaños</option>
      <option value="corporativo">Corporativo</option>
      <option value="conferencia">Conferencia</option>
      <option value="otro">Otro</option>
    </select>
    <br>
    <label for="fechaEvento">
      Fecha del evento
    </label>
    <input
      type="date"
      id="fechaEvento"
      name="fechaEvento"
    />
    <br>
    <label for="horaInicio">
      Hora de inicio
    </label>
    <input
      type="time"
      id="horaInicio"
      name="horaInicio"
    />
    <br>
    <label for="asistentesNumber">
      Número de asistentes
    </label>
    <input
      type="number"
      id="asistentesNumber"
      name="asistentes"
      min="10"
      max="500"
      step="1"
    />
    <br>
    <input
      type="range"
      id="asistentesRange"
      min="10"
      max="500"
      step="1"
    />

  </fieldset>

  <button type="submit">
    Enviar solicitud
  </button>

</form>

</template>
