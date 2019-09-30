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

exports.decode = async function( token, req) {
    
    let respuesta = false;
   
   jwt.verify( token , clave, function( err , decode){
        if( err ){
            console.log("error", err);    
            return respuesta = false;
        }
        if( decode ){
             let today = new Date(decode.exp);
                console.log('decode', decode );
                console.log("exp", today);
                console.log("today", Date.now());

                var dd = today.getDate(); 
                    var mm = today.getMonth() + 1; 

                    var yyyy = today.getFullYear(); 
                    if (dd < 10) { 
                        dd = '0' + dd; 
        } 
        if (mm < 10) { 
            mm = '0' + mm; 
        } 
         today = dd + '/' + mm + '/' + yyyy+" "+today.getHours()+":"+today.getMinutes(); 
         
          console.log("fecha en que expora", today);
          
            var resta =  decode.exp - Date.now();
            if( resta <= 0 ) {
                return respuesta = false;
            }else{
                if(decode.role =='Admin'){
                    respuesta = true;
                }else{
                    req.body.role ='rol no permitido';
                    respuesta = false;
                }
                
            }   
            

        }
    });
    return respuesta;
    
   

}