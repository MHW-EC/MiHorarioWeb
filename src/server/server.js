const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const httpProxy = require('http-proxy');
const MobileDetect = require('mobile-detect');
const app = express();
const Generador = require('../server_modules/Generador');
const Util = require('../server_modules/Util');
//--Nuevo inici
let mongoose = require('mongoose');
let cors = require('cors');
let database = require('./database/db');
const carreraRoute = require('./routes/carrera.routes');
const teoricoRoute = require('./routes/teorico.routes');
const practicoRoute = require('./routes/practico.routes');
//--Nuevo fin

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false })); comentado porque interfiere con la coneeccion de la base de datos
//No se en que afecte
app.use(express.static(path.join(__dirname, '..', '..', 'build')));

//Nuevo inicio
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

const PORT = 8080;
app.set('port', process.env.PORT || PORT);

app.put('/generar', function (req, res) {
	console.log('Generando horarios');

	if (typeof req.body !== 'undefined') {
		const paquetes = req.body;
		//console.log(paquetes);
		const castFunction = (paquete) => {
			return { paquete: paquete };
		}; //Necesaria debido a falencas de clase set es6

		const paquetesObj = paquetes.map(castFunction);

		const generador = new Generador(paquetesObj);

		//console.log(generador.HorariosGenerados.map((horario) => horario.materias));//horario es una obj de clase

		res.send(generador.HorariosGenerados.map((horario) => horario.materias));
	} else {
		res.send([null]);
	}
});

app.use(cors());
app.use('/carrera', carreraRoute);
app.use('/teorico', teoricoRoute);
app.use('/practico', practicoRoute);
//Nuevo fin

//Nuevo inicio
mongoose.Promise = global.Promise;
mongoose
	.connect(database.db, {
		useUnifiedTopology: true,
		dbName: 'heroku_28zqn5s2',
	})
	.then(
		(p) => {
			console.log('Database connected sucessfully !');
		},
		(error) => {
			console.log('Database could not be connected : ' + error);
		}
	);
//Nuevo fin

app.get('/ping', function (req, res) {
	return res.send('pong');
});

app.get('/isMobile', async function (req, res) {
	let info = await Util.usageCPU_MEN();
	let link_origen = req.headers.host;
	if (info) {
		let link =
			link_origen === 'https://mihorarioweb.azurewebsites.net'
				? 'https://mihorarioweb.herokuapp.com'
				: 'https://mihorarioweb.azurewebsites.net';
		console.log(link);

		res.send({ ruta: link });
	} else {
		let detector = new MobileDetect(req.headers['user-agent']);
		console.log(detector.os());
		res.send({ data: detector.os() + '' });
	}
});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
});
//process.env.PORT ||
app.listen(app.get('port'), () => {
	console.log(`Server funcionando! ${app.get('port')}`);
});
