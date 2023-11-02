<template>
    <!-- FORMULARIO -->
    <form class="form" v-on:submit.prevent="goSearch">
        <h1>Search Users GitHub</h1>
        <input v-model="busqueda" type="text" placeholder="ingrese el github">
        <p>{{ busqueda }}</p>
        <input class="inputButton" type="submit" value="submit">
        <!-- ERROR -->
        <div class="error" v-if="mostrarError">
            <h3>{{ mostrarError }}</h3>
        </div>
    </form>

    <!--RESULTADO -->
    <div class="container">
        <div class="resultado" v-if="result && !mostrarError">
            <h2 class="resultado_name">{{ result.login }}</h2>
            <div class="imgContainer">
                <img class="imagen" v-bind:src="result.avatar_url" v-bind:alt="result.name">
            </div>
            <div class="biografia">
                <h1>id: {{ result.id }}</h1>
                <h1>followers: <span> {{ result.followers }}</span></h1>
                <p> {{ result.bio }}</p>

                <div class="containerFav">
                    <a v-bind:href="result.html_url" target="_blank">{{ result.html_url }}</a>
                    <button v-on:click="manejadoraBoton" class="buttonFav">
                        {{ isUsuarioFavoritos ? 'remove' : 'add' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <p v-if="!result" class="waiting"> waiting for search...</p>
    <!-- FAVORITOS -->
    <div class="favoritos">
        <div v-for="favorito in todosLosFavoritos">
            <div class=" imgContainerFav">
                <img class="imagen" v-bind:src="favorito.avatar_url" alt="">
            </div>
        </div>
    </div>
</template>


<script setup>
//api
const API = "https://api.github.com/users/";
//import
import { ref, computed } from 'vue';
// definicion de variables
let busqueda = ref('').value
let result = ref(false)
let mostrarError = ref(false)
let favoritos = ref(new Map())

// llamada a la api
async function goSearch() {
    try {
        const response = await fetch(API + busqueda)
        if (!response.ok) {
            throw Error(`surgio un error de tipo ${response.status} - ${response.statusText}`);
        }
        const data = await response.json()
        result.value = data
        console.log(result.value)
        mostrarError.value = false

    } catch (error) {
        console.log(error)
        mostrarError.value = error
    } finally {
        busqueda = '';
    }
}


// funcion verificadora:
function verificadora(ingresoID) {
    return favoritos.value.has(ingresoID)
}


//boton toggle  
let manejadoraBoton = () => {
    let usuarioID = result.value.id // pedimos el id al usuario ingresado.
    //verificamos si ese id se encuentra ya en la lista de favoritos
    if (verificadora(usuarioID)) {
        // si esta.. le damos la funcion de borrar de la lista de favoritos al boton
        favoritos.value.delete(usuarioID)
        llamadaLocalStorage()
    } else {
        // pero sino esta, lo invitamos, con la fucion de set "agregar"
        favoritos.value.set(usuarioID, result.value)
        console.log(favoritos)
        llamadaLocalStorage()

    }
}


// unidad computada
// validacion para el renderizado de favoritos
let isUsuarioFavoritos = computed(() => {
    return favoritos.value.has(result.value.id)
})
// creacion del array en base al map favoritos para la validacion en bucle de isUsuarioFavoritos
let todosLosFavoritos = computed(() => {
    return Array.from(favoritos.value.values())
});


// LOCALSTORAGE//
// llamada al localStorage
function llamadaLocalStorage() {
    window.localStorage.setItem('favoritos', JSON.stringify(todosLosFavoritos.value))// el nombre o la key que vamos a recuperar los valores
}
// guardo los datos del localStorage
let localStorageFavoritos = JSON.parse(window.localStorage.getItem('favoritos'))
console.log(localStorageFavoritos) // retorna un array con objetos (el favorito)
//valido que existan elementos en el localStorgeFavoritos, copia  de la estructura de Map Favoritos e insercion de los datos del LocalStorage.

if (localStorageFavoritos && localStorageFavoritos.length) {
    const favoritosLS = favoritos.value
    localStorageFavoritos.map (favorito =>
        favoritosLS.set(favorito.id, favorito)
    )
    favoritos.value = favoritosLS
}


</script>


<style scoped>
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

.imgContainer {
    width: 8rem;
    height: 8rem;
    margin: 0.5rem;
}

.imagen {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.resultado {
    display: flex;
    border: solid white 1px;
    padding: 1rem;
    width: 25rem;
    max-width: 30rem;
    flex-direction: column;
    align-items: center;
    align-content: center;
}

.resultado_name {
    text-transform: capitalize;
    font-weight: 500;

}

.biografia>h1 {
    font-size: 1.2rem;
    font-weight: 500;
}


.waiting {
    text-align: center;
}

.containerFav {
    display: grid;
    grid-auto-flow: column;
    gap: 2rem;
}


.buttonFav {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    border: none;
    height: 2rem;
    font-size: 0.8rem;
    background-color: rgb(23, 82, 1);
    color: white;
    font-weight: 500;
    text-transform: uppercase;
}

.buttonFav:hover {
    cursor: pointer;
}

.favoritos {
    display: flex;

}

.imgContainerFav {
    display: flex;
    flex-direction: row;
    width: 8rem;
    height: 8rem;
    margin: 0.5rem;
}
</style>
