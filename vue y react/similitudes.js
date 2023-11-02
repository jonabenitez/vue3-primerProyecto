// 1. PARA CAPTURAR UN EVENTO V-MODEL = ONCHANGE.
// REACT = ONCHANGE.
import React, { useState } from 'react';

function FormExample() {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <input type="text" value={message} onChange={handleChange} />
  );
}

// VUE3 V- MODEL + REF()
/* <template>
  <input v-model="message" type="text">
  <p>Input value: {{ message }}</p>
</template>

<script SETUD> 
import { ref } from 'vue';
    const message = ref('')

</script>
*/


/////// 2 RENDERIZAR UNA PORCION DE INTERFAZDEPENDIENDO DE UNA CONDICION /////

// VUE 3
// CON LA DIRECTIVA V-IF, VAMOS RENDERIZAR EL DIV RESULTADO.
// <div class="resultado" v-if="result ">
// <h2 class="resultado_name">{{ result.login }}</h2>
// <div class="imgContainer">
//     <img class="imagen" v-bind:src="result.avatar_url" v-bind:alt="result.name">
// </div>

// REACT
function YourComponent({ result }) {
  return (
    <div>
      {result && (  // Si result es true, se renderiza el bloque
        <div className="resultado">
          <h2 className="resultado_name">{result.login}</h2>
          <div className="imgContainer">
            <img className="imagen" src={result.avatar_url} alt={result.name} />
          </div>
        </div>
      )}
    </div>
  );
}
// en el caso de react se logra con el condicionante pero con esta estructura:
// significa que si result es true, se renderizará el bloque de elementos dentro del paréntesis