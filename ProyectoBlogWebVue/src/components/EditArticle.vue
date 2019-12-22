<template src="./CreateArticle.html"></template>

<script>
import Sidebar from "./Sidebar";
import { Global } from "../Global";
import axios from "axios";
import Article from "../models/Article.js";
import { required } from "vuelidate/lib/validators";
import swal from "sweetalert";

export default {
  name: "CreateArticle",
  components: {
    Sidebar
  },
  data() {
    return {
      url: Global.url,
      article: new Article("", "", null, ""),
      file: null,
      submitted: false,
      isEdit: true
    };
  },
  validations: {
    article: {
      title: {
        required
      },
      content: {
        required
      }
    }
  },
  mounted() {
      var articleID = this.$route.params.id;
      this.getArticle(articleID);
  },
  methods: {
    getArticle(articleID) {
      axios.get(this.url + "article/" + articleID).then(res => {
        if (res.data.status == "success") {
          this.article = res.data.article;
        }
      });
    },

    fileChange() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    save() {
      this.submitted = true;
      var articleID = this.$route.params.id;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        axios
          .put(this.url + "article/"+articleID, this.article)
          .then(response => {
            if (response.data.status === "success") {
              //subida archivo
              if (
                this.file != null &&
                this.file != undefined &&
                this.file != ""
              ) {
                const formData = new FormData();
                formData.append("file0", this.file, this.file.name);
                axios
                  .post(
                    this.url + "upload/" + response.data.article._id,
                    formData
                  )
                  .then(res => {
                    if (res.data.article) {
                      swal(
                        "Articulo Editado!",
                        "El artículo se ha editado correctamente",
                        "success"
                      );
                      this.article = res.data.article;
                      this.$router.push("/articulo/"+articleID);
                    } else {
                      swal(
                        "Error al editar!",
                        "El artículo no se ha editado correctamente",
                        "error"
                      );
                    }
                  })
                  .catch(e => {
                    console.log(e);
                  });
              } else {
                swal(
                  "Articulo Editado!",
                  "El artículo se ha editado correctamente",
                  "success"
                );
                this.article = response.data.article;
                this.$router.push("/articulo/"+articleID);
              }
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  }
};
</script>
