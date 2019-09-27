
const jwtHelper = require('../helpers/jwtHelper');


function protegerRutas( req, res, next){
 
   if( !req.headers.authorization ){
     res.status(400).json({ message: 'acceso restringido'});
   }else{
       let token = req.headers.authorization;
    
       console.log('token decode', jwtHelper.decode(token));
    
    next();
   }
   
}

module.exports = {
    protegerRutas
};