const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    nick:       { type: String, required: true },
    correo:     { type: String, required: true },
    password:   { type: String, required: true },
    nombre:     { type: String, required: true },
    apellido:   { type: String, required: true },
    activo:     { type: Boolean, required: true }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('User', userSchema);