const Movie = require('../models/moviesModel');



function list( req, res ){

    Movie.find({}).exec( function( error , movies ){
        if(error){
            return res.status(400).json({ 'error': error });
        }
        if(movies){
            return res.status(200).json( { 'movies': movies } );

        }else{
            return res.status(400).json({ 'error': 'no se pueden mostrar películas' });
        }
    })

}


function listMovieUsers( req, res ){

    Movie.find({}).exec( function( error , movies ){
        if(error){
            return res.status(400).json({ 'error': error });
        }
        if(movies){
            return res.status(200).json( { 'movies': movies } );

        }else{
            return res.status(400).json({ 'error': 'no se pueden mostrar películas' });
        }
    })

}



function create( req, res){
    
    if( !req.body.movie ){
        return res.status(400).json( { 'error': 'Faltan parámetros movie' } );
    }else{
        let body = req.body.movie;
        
        let newMovie = new Movie( body );

        newMovie.save()
        .then( () => {
            return res.status(200).json({'message':'movie creada '  ,'movie': newMovie});
        })
        .catch( error => {
            return res.status(400).json({'error': 'no se ha podido crear la película'});
        })

    }
    
}

function update( req, res ) {

    if( !req.query.id ) {
        return res.status(400).json( { 'error': 'Faltan parámetros movie' } );
    }else{
       let id = req.query.id;
       let body = req.body.movie;

       Movie.updateOne({ _id: id }, {$set : body}, function( error, movieUpdate){
            if( error ){
                return res.status(400).json({'error':'error en movie update '});
            }
            if( movieUpdate ){
                return res.status(200).json({'message': 'película actualizada', 'movie': movieUpdate});
            } 
       });
    }

}

function borrar( req, res){
    
    if( !req.query.id ) {
        return res.status(400).json( { 'error': 'Faltan parámetros borrar movie' } );
    }else{
       let id = req.query.id;
       

       Movie.deleteOne({ _id: id }, function( error, movieDelete){
            if( error ){
                return res.status(400).json({'error':'error en movie borrar '});
            }
            if( movieDelete ){
                return res.status(200).json({'message': 'película borrada', 'movie': movieDelete});
            } 
       });
    }

}


module.exports = {
    list,
    create,
    update,
    borrar
}
