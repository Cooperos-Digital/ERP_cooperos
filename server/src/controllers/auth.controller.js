const usersController = {}
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const EstadosAuth = {
    CUENTA_VALIDA: 1,
    USUARIO_INCORRECTO: 2,
    CONTRA_INCORRECTA: 3,
    USUARIO_EXISTENTE: 4,
    PASSWORD_INVALIDO: 5,
    USUARIO_INVALIDO: 6,
    CORREO_INVALIDO: 7
}

//Códigos de error
// 200 OK - La solitud ha tenido éxito
// 201 Created - La solicitud ha tenido éxito y ha creado un nuevo recurso como resultado
// 403 Forbidden - El cliente no posee los permisos necesarios para cierto contenido
// 404 Not found - El servidor no pudo encontrar el contenido solicitado
// 500 Internal Server Error - El servidor ha encontrado una situación que no sabe cómo manejarla

async function VerificarCuenta(_user) {
    const user = await User.findOne({nick: _user.nick});

    if(!user) return EstadosAuth.USUARIO_INCORRECTO;
    if(user.password !== _user.password) return EstadosAuth.CONTRA_INCORRECTA;
    return EstadosAuth.CUENTA_VALIDA;
}

usersController.RegistrarUsuario = async (req, res) => {
    try {
        //Primero validamos que no existe un usuaro con esos datos
        const user_temp = await User.findOne({ nick: req.body.nick });
        if(user_temp) return res.status(404).send("USUARIO_EXISTENTE"); //El usuario ya se encuentra registrado

        //Ahora si registramos en la DB
        const newUser = new User({ nick: req.body.nick, correo: req.body.correo, nombre: req.body.nombre, apellido: req.body.apellido, password: req.body.password, activo: true });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, 'CooperosMolaMucho');
        res.status(200).json(token);
    } catch (error) {
        res.status(500).send("ERROR_EXCEPCION");
    }
}

usersController.IniciarSesion = (req, res) => {
    const cuenta_valida = VerificarCuenta(req.body);
    
    cuenta_valida.then((respuesta) => {
        switch (respuesta) {
            case EstadosAuth.USUARIO_INCORRECTO:
                res.status(404).send("USUARIO_INCORRECTO");
                break;
            case EstadosAuth.CONTRA_INCORRECTA:
                res.status(404).send("CONTRA_INCORRECTA");
                break;
            case EstadosAuth.CUENTA_VALIDA:
                const token = jwt.sign({_id: req.body._id}, 'CooperosMolaMucho');
                res.status(200).json(token);
                break;
            default:
                res.status(404).send("ERROR_DESCONOCIDO");
                break;
        }
    }).catch(() => {
        res.status(500).send("ERROR_EXCEPCION");
    })
}

module.exports = usersController;