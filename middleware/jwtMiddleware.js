
const jwtHelper = require('../helpers/jwtHelper');


async function protegerRutas( req, res, next){
 
   if( !req.headers.authorization ){
     
     res.status(400).json({ message: 'acceso restringido'});
   }else{
       let token = req.headers.authorization;
       console.log("jwtHelper.decode(token)",  await jwtHelper.decode(token, req));
       
       if( await jwtHelper.decode(token,req) == false){

       return res.status(400).json({ message: 'token expirado o invalido', role: req.body.role});
       }
       
    
    next();
   }
   
}

module.exports = {
    protegerRutas
};