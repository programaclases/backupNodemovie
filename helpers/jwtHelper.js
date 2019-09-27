const jwt = require('jsonwebtoken');
const clave = "mi_clave_secreta";

exports.encode = function( user ){

    let playload = {
        nombre: user.nombre,
        email: user.email,
        role: user.role,
        iat: Date.now() ,
        exp: (Date.now() +( 1000*60*60 ) )
    }

    var token = jwt.sign(playload, clave);
    
    return token;

}

exports.decode = function( token) {

    let respuesta = jwt.decode( token , clave);

    return respuesta;

}