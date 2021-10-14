const { Router } = require('express');
const router = Router();
const users = require('../controllers/users.controller');

router.get('/', users.GetUsuarios);

module.exports = router;