<template>
    <div>
      <form @submit.prevent="guardarUsuario">
        <label for="nombre">Nombre de usuario:</label>
        <input v-model="usuarioInput" type="text" id="nombre" name="nombre">
        <button type="submit">Guardar</button>
      </form>
      <div>
        <p>Usuario ingresado: {{ usuarioInput }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';// el ref es para indicar que un valor va a ser reactivo, se va a mostrar los cambios en la interfaz
  const usuarioInput = ref('');
  
  const guardarUsuario = () => {
    // Puedes realizar alguna acción aquí, si es necesario, con el valor ingresado
    console.log('Usuario ingresado:', usuarioInput.value);
  };
  </script>
  