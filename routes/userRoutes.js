const express = require('express');
const apUser = express();
const userController = require('../controllers/userController');
const jwtProteger = require('../middleware/jwtMiddleware');



apUser.get('/list',userController.listar);

apUser.post('/login', userController.login);

apUser.get('/usuario', userController.getUser);

apUser.post('/crear', userController.crear);

apUser.put('/update', userController.update);
apUser.put('/updatePassword', userController.updatePassword);

apUser.delete('/borrar', userController.borrar);




module.exports = apUser;