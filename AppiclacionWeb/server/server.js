
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const MobileDetect = require('mobile-detect');
const app = express();

//--Nuevo inicio
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
app.use(express.static(path.join(__dirname, 'build')));

//Nuevo inicio
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/carrera', carreraRoute);
app.use('/teorico', teoricoRoute);
app.use('/practico', practicoRoute);
//Nuevo fin

//Nuevo inicio
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully !')
},
    error => {
        console.log('Database could not be connected : ' + error)
    }
)
//Nuevo fin


app.get('/ping', function (req, res) {
  
  return res.send('pong');
});

app.get('/isMobile', function(req, res){
  
  let detector = new MobileDetect(req.headers['user-agent']);
  let respuesta;
  console.log(detector);
  detector.os() != null? respuesta = true : respuesta = false
  res.send(respuesta)
})


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
//process.env.PORT || 
app.listen(8080, () => {console.log(`Server funcionando! ${8080}`)});