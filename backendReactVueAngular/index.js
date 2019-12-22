'use strict'


var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.set('useFindAndModify',false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog',{useNewUrlParser:true})
        .then(() => {
            console.log("la conexión a la base de datos se ha realizado correctamente.");
            //crear servidor y escuchar

            app.listen(port,() => {
                console.log("Servidor corriendo en puerto:" +port);
            });

});