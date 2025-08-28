const express = require('express');
const bodyparser = require('body-parser');

const personaRoutes = require('./src/routes/personaRoutes.js');
const usuarioRoutes = require('./src/routes/usuarioRoutes.js');
const respuestaRoutes = require('./src/routes/respuestaRoutes.js');
const historialRoutes = require('./src/routes/historialRoutes.js');

const app = express();

app.use(bodyparser.json());
app.use('/persona', personaRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/respuesta', respuestaRoutes);
app.use('/historial', historialRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
