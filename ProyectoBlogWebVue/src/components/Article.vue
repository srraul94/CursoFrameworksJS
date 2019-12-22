<template>
  <div class="center">
    <section id="content">
      <article class="article-item article-detail" v-if="article">
        <div class="image-wrap">
          <img :src="url + 'get-image/' +article.image" :alt="article.title" v-if="article.image" />
          <img src="https://pbs.twimg.com/media/DxPrX_4XQAAreTB.jpg" :alt="article.title" v-else />
        </div>

        <h1 class="subheader">{{article.title}}</h1>
        <span class="date">{{article.date | moment("from","now")}}</span>
        <p>{{article.content}}</p>

        <div class="clearfix"></div>

        <router-link :to="'/editar/'+article._id" class="btn btn-warning">Editar</router-link>
        <a @click="deleteArticle(article._id)" class="btn btn-danger">Eliminar</a>
      </article>
    </section>
    <Sidebar></Sidebar>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import axios from "axios";
import Sidebar from "./Sidebar";
import { Global } from "../Global";
import swal from "sweetalert";

export default {
  name: "Article",
  components: {
    Sidebar
  },
  mounted() {
    var articleID = this.$route.params.id;
    this.getArticle(articleID);
  },
  data() {
    return {
      url: Global.url,
      article: null
    };
  },
  methods: {
    getArticle(articleID) {
      axios.get(this.url + "article/" + articleID).then(res => {
        if (res.data.status == "success") {
          this.article = res.data.article;
        }
      });
    },
    deleteArticle(articleID) {
      swal({
        title: "Estas seguro??",
        text: "Si lo borras, te quedarás sin el para siempre",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          axios.delete(this.url + "article/" + articleID).then(response => {
            swal("Articulo Borrado!", "El artículo se ha borrado", "success");
             this.$router.push("/blog");
          });
        } else {
          swal("Rectificar es de sabios :D!");
        }
      });

     
    }
  }
};
</script>