'use strict'

var validator = require('validator');
var Article = require('../models/article');
var fs = require('fs');
var path = require('path');

var controller = {

    datosCurso: (req, res) => {

        var hola = req.body.hola;
        return res.status(200).send({
            curso: 'Master',
            autor: 'Raul',
            url: 'www.google.es',
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción de test del controlador'
        });
    },

    save: (req, res) => {
        //Recoger los params por post.
        var params = req.body;

        //validar los datos (validator)
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }
        catch (err) {
            return res.status(200).send({
                status: 'error',
                message: "Faltan datos por enviar"
            });
        }

        if (validate_title && validate_content) {
            //crear el objeto a guardar
            var article = new Article();

            //asignar valores
            article.title = params.title;
            article.content = params.content;

            if(params.image){
                article.image = params.image;
            }
            else{
                article.image = null;
            }

            //guardar articulo
            article.save((err, articleStored) => {

                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });
                }

                //Respuesta.
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });

            });


        }
        else {
            return res.status(200).send({
                status: 'error',
                message: "Los datos no son válidos!!!"
            });
        }
    },

    getArticles: (req, res) => {

        var query = Article.find({});

        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(3);
        }
        //Find

        query.sort('-_id').exec((err, articles) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener articulos'
                });
            }

            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se han encontrado articulos'
                });
            }

            //Respuesta.
            return res.status(200).send({
                status: 'success',
                articles
            });
        });
    },

    getArticle: (req, res) => {
        //Recoger el id de la url
        var articleID = req.params.id;
        if (!articleID || articleID == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No se han encontrado el articulo'
            });
        }
        else {
            Article.findById(articleID, (err, article) => {

                if (err || !article) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No se han encontrado el articulo'
                    });
                }

                //Respuesta.
                return res.status(200).send({
                    status: 'success',
                    article
                });


            });
        }

    },

    updateArticle: (req, res) => {
        var articleID = req.params.id;
        var params = req.body;

        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }
        catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content) {
            Article.findOneAndUpdate({ _id: articleID }, params, { new: true }, (err, articleUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualziar articulo'
                    });
                }

                if (!articleUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No se han encontrado el articulo'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });

            });
        }
        else {
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta'
            });
        }
    },

    deleteArticle: (req, res) => {
        var articleID = req.params.id;
        console.log(req.params);
        //Find and delete
        Article.findOneAndDelete({ _id: articleID }, (err, articleRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar el articulo',
                    p: req.params
                });
            }

            if (!articleRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se han borrado el articulo'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
        });
    },

    upload: (req, res) => {
        //Configurar modulo conect multiparty router/article.js

        //recoger el fichero
        
        var file_name = 'Imagen no subida';
        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }
        //conseguir nombre y extensión
        var file_path = req.files.file0.path;
        var file_split = file_path.split('/');

        //Nombre del archivo
        var file_name = file_split[2];
        //Extension
        var extension_split = file_name.split('.');
        var file_ex = extension_split[1];
        //Comprobar extension, si no valido borrar
        if (file_ex != 'png' && file_ex != 'jpg' && file_ex != 'jpeg' && file_ex != 'gif') {
            fs.unlink(file_path, (err) => {
                return res.status(404).send({
                    status:'error',
                    message: 'La extensión no es válida'
                });
            });
        }
        else {
            var articleID = req.params.id;

            if(articleID){
                Article.findOneAndUpdate({_id:articleID},{image:file_name},{new:true},(err,articleUpdated) => {
                
                    if(err || !articleUpdated){
                        return res.status(200).send({
                            status:'error',
                            message: 'Error al guardar la imagen del artículo'
                        });
                    }
                    
                    return res.status(200).send({
                        status: 'success',
                        article: articleUpdated
                    });
                });
            }
            else{
                return res.status(200).send({
                    status: 'success',
                    image: file_name
                });
            }

            

        }
       
    },

    getImage : (req,res) => {
        var file = req.params.image;
        var path_file = './upload/articles/'+file;
    

        fs.exists(path_file,(exists) =>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }
            else{
                return res.status(404).send({
                    status: 'error',
                    message:'No existe la imagen'
                });
            }
        });
    },

    search: (req,res) => {

        //sacar el string a buscar
        var searchString = req.params.search;
        
        Article.find({"$or" :[
            {"title":{"$regex":searchString,"$options":"i"}},
            {"content":{"$regex":searchString,"$options":"i"}},

        ]})
        .sort([['date','descending']])
        .exec((err,articles)=>{

            if(err){
                return res.status(500).send({
                    status: 'errr',
                    message:'Error en la petición'
                });
            }

            if(!articles || articles.length <= 0){
                return res.status(200).send({
                    status: 'success',
                    message:'No se han encontrado coincidencias'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        });

       
    }



};


module.exports = controller;