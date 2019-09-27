const express = require('express');
const api = express();
const userRoutes = require('./routes/userRoutes');
const moviesRoutes = require('./routes/movieRoutes');

/*
* nuevo comentario
*/

/*
* nuevo comentario
*/

/*
* nuevo comentario
*/

/*
* nuevo comentario
*/

/*
* nuevo comentario
*/

api.use('/users', userRoutes);

api.use('/movies', moviesRoutes);

/*  api.get('/pruebas', function( req, res ){
    req.headers.authorization
}); 
  */

module.exports = api;