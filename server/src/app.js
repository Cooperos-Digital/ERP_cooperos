const express = require('express');
const morgan = require('morgan'); //Middleware para procesar peticiones y mostrarlas por consola
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); // Le permite a express poder entender json
app.set('PORT', process.env.PORT || 4000); //Recibimos el puerto desde las variables de entorno sino utilizamos el 4000
app.use(morgan('dev')); //Mostramos las peticiones por consola

//Nos ponemos a la escucha de las rutas
app.use("/api/auth", require('./routes/auth.routes'));
app.use("/api/users", require('./routes/users.routes'));

module.exports = app;