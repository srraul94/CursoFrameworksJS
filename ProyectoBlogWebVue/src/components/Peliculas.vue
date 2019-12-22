<template>
  <div class="general">
    <div class="center">
      <section id="content">
        <h1 class="subheader">Películas</h1>

        <div class="misdatos" v-if="misDatos">
          {{misDatos  | mayusculas | concatenarYear('Este es mi año')}}
        </div>

        <div class="favorita" v-if="favorita">
          <h2>La pelicula favorita es:</h2>
          <h3>{{favorita.title}}</h3>
        </div>
        <!--Listado articulos-->
        <div id="articles">
          <div v-for="peli in peliculasMayus" v-bind:key="peli.title">
            <Pelicula :peli="peli" @favorita="haLlegadoFavorita"></Pelicula>
          </div>
        </div>
      </section>
      <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import Pelicula from "./Pelicula";
import Sidebar from "./Sidebar.vue";

export default {
  name: "Peliculas",
  components: { Pelicula, Sidebar },
  methods: {
    haLlegadoFavorita(favorita) {
      this.favorita = favorita;
    }
  },
  filters:{
    mayusculas(value){
      return value.toUpperCase();
    },
    concatenarYear(value, message){
      var date = new Date();
      return value + ' '+ date.getFullYear() + ' ' +message;
    }
  },
  computed: {
    peliculasMayus() {
      var pelisModificadas = this.peliculas;
      for (var i = 0; i < this.peliculas.length; i++) {
        pelisModificadas[i].title = pelisModificadas[i].title.toUpperCase();
      }

      return pelisModificadas;
    },
    misDatos() {
      console;
      return this.nombre + " " + this.apellidos;
    }
  },
  data() {
    return {
      nombre: "Raul",
      apellidos: "Sanchez",
      favorita: null,
      peliculas: [
        {
          title: "Batman",
          year: 2017,
          image:
            "https://www.jotdown.es/wp-content/uploads/2019/04/oie_woCz5eFVFGB8.jpg"
        },
        {
          title: "One Piece",
          year: 1997,
          image:
            "https://cdn.vox-cdn.com/thumbor/7TzXXGeyMRbOjKE7UDiNXOHlQK0=/0x0:1280x738/1200x800/filters:focal(538x267:742x471)/cdn.vox-cdn.com/uploads/chorus_image/image/65232906/one_piece.0.png"
        },
        {
          title: "Gran Torino",
          year: 2017,
          image:
            "https://image.slidesharecdn.com/grantorino-120502204451-phpapp01/95/gran-torino-1-728.jpg?cb=1335992148"
        }
      ]
    };
  }
};
</script>