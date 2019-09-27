const mongoose = require('mongoose');
const schema = mongoose.Schema;

const movieSchema = schema({
    titulo:{
        type: String,
        required: [true, 'El titulo es necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es necesaria']
    },
    imagen: String,
    user: { type: schema.ObjectId, ref: 'user' }
    
});


module.exports = mongoose.model('movie',movieSchema);