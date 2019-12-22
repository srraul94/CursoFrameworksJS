<template>
  <section id="articles-component">
    <div v-if="!articles">Cargando...</div>
    <div id="articles-list" v-if="articles && articles.length >= 1">
      <article class="article-item" v-for="article in articles" :key="article._id">
        <div class="image-wrap">
          <img :src="url+'/get-image/'+article.image" :alt="article.title" v-if="article.image" />
          <img
            src="https://pbs.twimg.com/media/DxPrX_4XQAAreTB.jpg"
            :alt="article.title"
            v-if="!article.image"
          />
        </div>
        <router-link :to="{name: 'article',params: {id:article._id}}">
            <h2>{{article.title}}</h2>
        </router-link>
        
        <span class="date">{{article.date | moment("from","now")}}</span>
        <router-link :to="{name: 'article',params: {id:article._id}}">Leer más</router-link>

        <div class="clearfix"></div>
      </article>
    </div>
  </section>
</template>

<script>
import { Global } from "../Global.js";

export default {
  name: "Articles",
  props: ["articles"],
  data() {
    return {
      url: Global.url
    };
  }
};
</script>