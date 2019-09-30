const Movie = require('../models/moviesModel');
const fs = require('fs');



function list( req, res ){

    Movie.find({}).populate('user','email').exec( function( error , movies ){
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

function myfileUpload (req,res){
       
    let id_movie = req.query.id_movie;

     
    if(!req.files){
        res.status(200).json({message:'no hay archivos'});
    }else{
        //res.status(200).json({message:'verificar datos', myfile: req.files.myfile.name, body: req.body });
        console.log("req ", req.files.myfile.name);
        let archivo = req.files.myfile;
        let nombre = req.files.myfile.name;
        let nombredivido = nombre.split('.');
        let extension = nombredivido[nombredivido.length-1];
        let extensionesValidas = ['png','jpg','jpeg','gif'];
        if(extensionesValidas.indexOf(extension.toLowerCase()) < 0){
         return res.status(400).json({message:'Extensión no validada, extesiones validads'+extensionesValidas.join(', ') });
        }else{
         
            let nombreArchivo = nombredivido[0]+""+Date.now()+"."+extension.toLowerCase();
            let path = `./public/${nombreArchivo}`;
            
            Movie.findOneAndUpdate({_id: id_movie},{ $set:{ imagen: nombreArchivo} }, (errMovie, movieRes) =>{
                if ( errMovie) {
                    res.status(200).json({ message: 'no se ha encontrado la película' });
                }

                if ( movieRes ) {

                    if (!fs.existsSync('./public/imagenes')){
                        fs.mkdirSync('./public/imagenes');
                        
                        path =`./public/imagenes/${nombreArchivo}`;
                        archivo.mv(path, err =>{
                            if(err){
                                res.status(400).json({ message:'no se ha subido archivo', err});
                            }else{
                                if( !fs.existsSync(movieRes.imagen) ){
                                    try {
                                        fs.unlink('./public/imagenes/' + movieRes.imagen);
                                    } catch (error) {
                                       return res.status(200).json({ message: 'se ha subido el archivo', movie: movieRes, imagen: 'imagen eliminada' });
                                    }
                                    res.status(200).json({ message: 'se ha subido el archivo', movie: movieRes, imagen: 'imagen eliminada' });
                                }else{
                                    
                                    res.status(200).json({ message: 'se ha subido el archivo', movie: movieRes});
                                }
                                
                            }
                            
                        });
                    }else{
                        path =`./public/imagenes/${nombreArchivo}`;
                        archivo.mv(path, err =>{
                            if(err){
                                res.status(400).json({ message:'no se ha subido archivo', err});
                            }else{
                                if( !fs.existsSync(movieRes.imagen) ){
                                    console.log('./public/imagenes/' + movieRes.imagen);
                                   try {
                                    fs.unlinkSync('./public/imagenes/' + movieRes.imagen);
                                   } catch (error) {
                                    return res.status(200).json({ message: 'se ha subido el archivo', movie: movieRes, imagen: 'imagen eliminada'});

                                   }
                                    res.status(200).json({ message: 'se ha subido el archivo', movie: movieRes, imagen: 'imagen eliminada'});
                                }else{
                                    es.status(200).json({ message: 'se ha subido el archivo', movie: movieRes }); 
                                }
                            }
                            
                        });
                    }
                    
                }else{
                    res.json({message: 'error'});
                }
            });
           
          
           
        }

        
    }

    
}




module.exports = {
    myfileUpload,
    list,
    create,
    update,
    borrar
}
