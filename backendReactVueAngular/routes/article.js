'use strict'


var express = require('express');
var ArticleController = require('../controllers/article');
var router = express.Router();

var multiparty = require('connect-multiparty');
var md_upload = multiparty({uploadDir:'./upload/articles'})

router.get('/test-controlador',ArticleController.test);
router.post('/datosCurso',ArticleController.datosCurso);

//RUTAS UTILES.
router.post('/save',ArticleController.save);
router.get('/articles/:last?',ArticleController.getArticles);
router.get('/article/:id',ArticleController.getArticle);
router.put('/article/:id',ArticleController.updateArticle);
router.delete('/article/:id',ArticleController.deleteArticle);
router.post('/upload/:id?',md_upload,ArticleController.upload);
router.get('/get-image/:image',ArticleController.getImage);
router.get('/search/:search',ArticleController.search);



module.exports = router;