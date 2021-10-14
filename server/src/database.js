const mongoose = require('mongoose'); //Librería para manejar consultas a MongoDB

mongoose
    .connect('mongodb://localhost/db_cooperos', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(db => console.log("Conectada a la base de datos"))
    .catch((err) => console.error(err));