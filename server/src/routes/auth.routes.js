const { Router } = require('express');
const router = Router();
const auth = require('../controllers/auth.controller');

router.post('/iniciar_sesion', auth.IniciarSesion);
router.post('/registrar_usuario', auth.RegistrarUsuario);

module.exports = router;