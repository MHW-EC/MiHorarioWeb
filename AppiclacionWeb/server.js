const codigoNombre = require("./server_resources/codigoNombre");
const mallasResumido = require("./server_resources/mallasResumido") ;
const mallas = require("./server_resources/mallas") ;
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));


app.get('/ping', function (req, res) {
  console.log('pong!');
 return res.send('pong');
});
//Esta funcion recibe un url de la forma /malla=*
//donde el * represnta el nombre de una carrera
//retorna una lista con los codigos de su malla[codigo1,codigo2, ...]
app.get("/malla=*", function (req, res) {
  let carrera = req['originalUrl'].split('=').pop();
  console.log("malla=");
 return res.send(mallasResumido['mallasResumido'][carrera]);
});

//Esta función recibe un url de la forma /nombre-materia=*
//donde el *  representa un codigo de materia
//retorna el nombre de la materia con dicho codigo
app.get("/nombre-materia=*", function (req, res) {
  let codigo = req['originalUrl'].split('=').pop();
  console.log("nombre-materia=");
  return res.send(codigoNombre['codigoNombre'][codigo]);
});

//Esta funcion retorna una lista con todas las carreras de espol
app.get("/carreras", function (req, res) {
  let carreras = Object.keys(mallasResumido['mallasResumido']);
 return res.send(carreras);
});

//Esta función retorna un objeto de la forma
//{<facultad>: {<carrera>: [codigo1,codigo 2...]...}...}
app.get("/mallas", function (req, res) {
  return res.send(mallas["mallas"]);
});


app.get('/', function (req, res) {
  
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {console.log('Server funcionando!')});