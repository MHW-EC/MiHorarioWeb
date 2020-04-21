const carreras = require("./server_resources/carreras")['carreras'];
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const MobileDetect = require('mobile-detect');
const app = express();

//--Nuevo inicio
let mongoose = require('mongoose');
let cors = require('cors');
let database = require('./database/db');
const carreraRoute = require('./routes/carrera.routes') 
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
app.use('/carrera', carreraRoute)
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

//Esta funcion retorna un arreglo con objetos de la forma
// { nombre: nombreCarrera, facultad: facultad, materias: [cod1,cod2,...]}
app.get("/carreras", function (req, res) {
  console.log("consulta a carreras")
 return res.send(carreras);
});


app.get('/', function (req, res) {
  
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
//process.env.PORT || 
app.listen(8080, () => {console.log(`Server funcionando! ${8080}`)});