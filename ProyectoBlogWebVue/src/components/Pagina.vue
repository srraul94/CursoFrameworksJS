<template>
  <div class="general">
    <Slider texto="Pagina de pruebas"></Slider>
    <div class="center">
      <section id="content">
        <h2 class="subheader">Página</h2>
        <h3>{{id_desde_url}}</h3>
        <button @click="actualizarNombre()">Actualizar Nombre</button>
        <button @click="redirigirAlBlog()">Redirigir al blog</button>

        <h4>{{nombre}}</h4>
      </section>
      <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import Slider from "./Slider.vue";
import Sidebar from "./Sidebar.vue";

export default {
  name: "Pagina",
  components: {
    Slider,
    Sidebar
  },

  created() {
    console.log("componente creado!");
  },

  mounted() {
    this.id_desde_url = this.$route.params.id;
    console.log("componente montado");
  },

  updated() {
    console.log("componente actualizado!");
  },

  destroyed() {
    console.log("componente eliminado!");
  },

  data() {
    return {
      id_desde_url: null,
      nombre: "Raul Sanchez"
    };
  },
  methods: {
    actualizarNombre() {
      this.nombre = "El mega papu";
      console.log(this.nombre);
    },
    redirigirAlBlog() {
      this.$router.push("/blog");
      // this.$router.push({name:'pagina',params:{id:'hola'}});
    }
  }
};
</script>