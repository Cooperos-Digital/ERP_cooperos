require('./database'); //Conexión a la DB
const app = require('./app');

app.listen(app.get('PORT'));
console.log("Servidor en el puerto " + app.get('PORT'));