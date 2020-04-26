const MobileDetect = require('mobile-detect');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./database/database');

let cors = require('cors');
const carreraRoute = require('./routes/carrera.routes');
const teoricoRoute = require('./routes/teorico.routes');
const practicoRoute = require('./routes/practico.routes');

const app = express();
//Configuracion
const PORT = 4000;
app.set('port', process.env.PORT || PORT);

//Middleware
app.use(morgan('dev'));
app.use(express.json());

//Rutas - URL's

app.use(cors());
app.use('/carrera', carreraRoute);
app.use('/teorico', teoricoRoute);
app.use('/practico', practicoRoute);
//app.use('/api/task', require('./routes/taks.routes'));

app.get('/isMobile', function (req, res) {
	let detector = new MobileDetect(req.headers['user-agent']);
	let respuesta;
	console.log(detector);
	detector.os() != null ? (respuesta = true) : (respuesta = false);
	res.send(respuesta);
});

//Archivos estaticos
console.log(path.join(__dirname, '..', 'public'));
app.use(express.static(path.join(__dirname, '..', 'public')));

//Empezando el servidor

app.listen(app.get('port'), () => {
	console.log(`--> Escuchando en el puerto ${app.get('port')}`);
});
