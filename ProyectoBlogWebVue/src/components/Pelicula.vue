<template>
  <article class="article-item">
    <div class="image-wrap">
      <img :src="peli.image" :alt="peli.title" />
    </div>

    <h2>{{peli.title}}</h2>
    <span class="date" v-bind:class="{
            yeargreen: peli.year >= 2000,
            yearblue: peli.year < 2000 
        }"
    >{{peli.year}}</span>
    <a href="#">Leer más</a>
    <input type="button" value="Marcar favorito"
      @click="pasarFavoritaAlPadre(peli)" />

    <div class="clearfix"></div>
  </article>
</template>

<script>
export default {
  name: "Pelicula",
  props: ['peli'],
  methods:{
    pasarFavoritaAlPadre(pelicula){
      this.$emit('favorita',pelicula);
    }
  },
  mounted(){
      console.log(this.pelicula)
  }
  

};
</script>