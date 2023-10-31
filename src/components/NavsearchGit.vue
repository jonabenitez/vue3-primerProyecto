<template>
    <form class="form" v-on:submit.prevent="goSearch">
        <input v-model="busqueda" type="text" placeholder="ingrese el github">
        <p>{{ busqueda }}</p>
        <input class="inputButton" type="submit" value="submit">

        <div class="error" v-if="mostrarError">
            <h3>Error</h3>
        </div>
    </form>
    <div class="container">
        <div class="resultado" v-if="result && !mostrarError">
            <h2 class="resultado_name">jonatan</h2>
            <div class="imgContainer">
                <img src="" alt="">
            </div>
            <p class="biografia">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut minus sit, ea esse, sapiente possimus nam ipsa
                quaerat magni, facilis commodi ipsum maxime? Quasi dolorum culpa quae quisquam repudiandae dolorem.
                <a href="">link de github</a>
            </p>
        </div>
        <p v-else> waiting for search...</p>
    </div>
</template>


<script setup>
const API = "https://api.github.com/users/";

import { ref } from 'vue';
let busqueda = ref('').value
let result = ref(false)
let mostrarError = ref(false)


async function goSearch() {
    try {
        const response = await fetch(API + busqueda)
        if (!response.ok) {
            throw Error(`surgio un error de tipo ${response.status} - ${response.statusText}`);
        }
        const data = await response.json()
        console.log(data)
        result.value = true
        mostrarError.value = false
    } catch (error) {
        console.log(error)
        mostrarError.value = true
    } finally {
        busqueda = null;
    }
}

</script>


<style scoped>
.container {
    display: flex;
    flex-direction: columns;
    align-items: center;
    justify-content: center;
}

.form {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

input {
    margin: 1px;
    padding: 1rem 4rem 1rem 1rem;
    border-radius: 10px;

}

.inputButton {
    background-color: rgb(14, 51, 0);
    border: white 1px solid;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: white;
    border-radius: 10px;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.8rem 3rem;
    margin-top: 1rem;
}

.resultado {
    display: flex;
    border: solid white 1px;
    padding: 1rem;
    flex-direction: column;
    align-items: center;
    align-content: center;

}
</style>
