const moviesController = require('../controllers/moviesController');
const express = require('express');
const appMovie = express();



appMovie.get('/listar', moviesController.list );

appMovie.post('/crear', moviesController.create );

appMovie.put('/update', moviesController.update );

appMovie.delete('/borrar', moviesController.borrar );


module.exports = appMovie;




