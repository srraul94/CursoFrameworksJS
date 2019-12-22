<template>
  <section id="content">
    <h2 class="subheader">{{titulo}}</h2>
    <h2>{{subtitulo}}</h2>

    <h2>Reactividad</h2>
    <input type="text" v-model="nombre" />
    Mi nombre es
    <strong>{{Nombre}}</strong>

    <h2>Directivas condicionales</h2>
    <input type="number" v-model="edad" />
    Mi edad es
    <strong>{{edad}}</strong>

    <p style="color:red;font-weigth:bold;" v-if="edad && edad >=18 && edad< 65" >Eres mayor!</p>
    <p style="color:red;font-weigth:bold;" v-else-if="edad && edad >=65">CALVOOOOO!</p>

    <p style="color:red;font-weigth:bold;" v-else>Eres un bebé</p>
    
    <h2>Directiva iterativa</h2>
    <ol>
      <li v-for="peli in peliculas" :key="peli">{{peli}}</li>

    </ol>


  </section>
</template>

<script>
export default {
  name: "MiComponente",
  data() {
    return {
      titulo: "Mi componente",
      subtitulo: "Soy el subtitulo de mi componente",
      nombre: "",
      edad: 0,
      peliculas: ['Batman','LOTR','Spiderman']
    };
  }
};
</script>