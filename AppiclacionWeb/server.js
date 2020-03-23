const codigoNombre = require("./server_resources/codigoNombre");
const mallas = require("./server_resources/mallas") ;
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));


app.get('/ping', function (req, res) {
  console.log('pong!')
 return res.send('pong');
});

//Esta función retorna un objeto de la forma
//{<codigo>:<nombre-mateira>, ...}
app.get('/codigo-materias', function (req, res) {
  return res.send(codigoNombre['codigoNombre']);
});

//Esta función retorna un objeto de la forma
//{<facultad>: {<carrera>: [codigo1,codigo 2...]...}...}
app.get('/mallas', function (req, res) {
  return res.send(mallas["mallas"]);
});

app.get('/', function (req, res) {
  
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {console.log('Server funcionando!')});