const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtToken = require('../helpers/jwtHelper');

function listar(req,res){
    user.find({},  function(error, respuestUser) {
        if( error){
            return res.status(400).json({'error': error, 'message':'no se puede listar usuarios'});
        }
        if( respuestUser ){
            return res.status(200).json({ 'message':'lista de  usuarios', 'usuarios': respuestUser });
        }
    });
    

}

function crear(req,res){
    
    //return res.status(200).json({'datos':req.body });

    const usuario = req.body.user;

    let newUser = new user( usuario );
/*
    newUser.nombre ='';
    newUser.email = ''
    newUser.password =''
*/
    bcrypt.hash(usuario.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    if( err) {
        return res.status(400).json({'error':'no se ha podido encriptar ' } );
    }
    if( hash ){
        newUser.password = hash;
        newUser.save()
        .then(() => 
        {
            console.log('usuario creado');
            res.status(200).json({'message':'Usuario creado' ,newUser} );
        })
        .catch(error => {
             console.log("error user", error);
                res.status(400).json({ error } );
            });
        
    }

  });


}

function update(req,res){
    let id = req.query.id;
    const usuario = req.body.user;
    
    const protectedUser = {
        nombre:usuario.nombre, 
        email:usuario.email, 
        role:usuario.role
    }

   /*  user.findByIdAndUpdate( id, {$set: protectedUser},{new:true} , function( error, userUpdate ){
        if( error ){
            return res.status(400).json({ error } );
        }

        if( userUpdate ){
            return res.status(200).json({ 'message': ' Usuario actualizado', userUpdate  } );
        } 
  
    }); */

    // el objeto no necesita llaves
    user.updateOne({ _id: id}, {$set: protectedUser }, function(error, userUpdate ){
    if( error ){
            return res.status(400).json({ error } );
        }

    if( userUpdate ){
        return res.status(200).json({ 'message': ' Usuario actualizado', userUpdate  } );
    }

    });


    
    

}

function updatePassword(req,res){
    let id = req.query.id;
    const password = req.body.password;
    //return res.status(200).json({ 'message': password } );

    bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        if( err) {
            return res.status(400).json({'error':'no se ha podido encriptar ' } );
        }
        if( hash ){
            
            user.updateOne({ _id: id}, {$set: { password: hash } }, function(error, userUpdate ){
                if( error ){
                        return res.status(400).json({ error } );
                    }
            
                if( userUpdate ){
                    return res.status(200).json({ 'message': ' Password encriptado actualizado', userUpdate  } );
                }
                });
            
        }
    
      });
    


    
    

}

function borrar(req,res){
    let id = req.query.id;

    user.find({ _id:id },  function(error, respuestUser) {
        
        if( error){
            return res.status(400).json({'error': error, 'message':'no se puede listar usuarios'});
        }
        if( respuestUser ){
            if(respuestUser.length < 1){
                return res.status(400).json({ 'error': 'id no existe' } );
            }
            user.deleteOne({ _id: id}, function(error, deleteUser ){
                if( error ){
                        return res.status(400).json({ error } );
                    }
            
                if( deleteUser ){
                    return res.status(200).json({ 'message': ' Usuario Borrado', deleteUser  } );
                }
            
                });
            
        }
    });

   

}
function login( req,res ){
    let usuario = req.body.user;
    
    user.findOne({email: usuario.email}, function(error, resp ){
        if(error){
            return res.status(400).json({'error  email': error });
        }
        if ( resp ){
            bcrypt.compare(usuario.password, resp.password, function(err, respuesta) {
                
                if( err ){
                    return res.status(400).json({'error': err });
                }
                if( respuesta == true ) {
                    let token = jwtToken.encode(resp);
                    return res.status(200).json({'message': 'usuario logueado','usuario': resp, token });
                } else {
                    /* 
                    * Este else controlar cuando la contraseñano no coincidan
                    */
                    return res.status(400).json({'error': 'email o password no coinciden' });
                }
            });
        }else{
            return res.status(400).json({'error': 'no se ha encontrado el email' });
        }
    } );

}
module.exports = { 
    updatePassword,
    login,
    listar,
    crear,
    update,
    borrar
 };