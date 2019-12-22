<template src="./CreateArticle.html">
</template>

<script>
import Sidebar from "./Sidebar";
import { Global } from "../Global";
import axios from "axios";
import Article from "../models/Article.js";
import { required } from "vuelidate/lib/validators";
import swal from 'sweetalert';

export default {
  name: "EditArticle",
  components: {
    Sidebar
  },
  data() {
    return {
      url: Global.url,
      article: new Article("", "", null, ""),
      file: null,
      submitted: false,
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
  mounted() {},
  methods: {
    fileChange() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    save() {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        axios
          .post(this.url + "save", this.article)
          .then(response => {
            if (response.data.status === "success") {
              //subida archivo
              if (this.file != null && this.file != undefined && this.file != "") {
                const formData = new FormData();
                formData.append('file0', this.file, this.file.name);
                axios
                  .post(
                    this.url + "upload/" + response.data.article._id,
                    formData
                  )
                  .then(res => {
                    if (res.data.article) {
                      swal('Articulo Creado!','El artículo se ha creado correctamente','success');
                      this.article = res.data.article;
                      this.$router.push("/blog");
                    }
                    else{
                       swal('Error al crear!','El artículo no se ha creado correctamente','error');
                      
                    } 
                  })
                  .catch(e => {
                    console.log(e);
                  });
              }
              else{
                 swal('Articulo Creado!','El artículo se ha creado correctamente','success');
                 this.article = response.data.article;
                 this.$router.push("/blog");
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
