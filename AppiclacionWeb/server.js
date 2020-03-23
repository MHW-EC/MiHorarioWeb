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
  
  return res.send('pong');
});

//Esta funcion recibe un url de la forma /malla/:carrera
//retorna una lista con los codigos de su malla[codigo1,codigo2, ...]
app.get("/malla/:carrera", function (req, res) {
  console.log('pedido')
  console.log(mallasResumido['mallasResumido'][req.params.carrera])
  return res.send(mallasResumido['mallasResumido'][req.params.carrera]);
  //return res.send('hola')
});

//Esta función recibe un url de la forma /nombre-materia/:codigo
//retorna el nombre de la materia con dicho codigo
app.get("/nombre-materia/:codigo", function (req, res) {
  return res.send(codigoNombre['codigoNombre'][req.params.codigo]);
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
//process.env.PORT || 
app.listen(8080, () => {console.log(`Server funcionando! ${8080}`)});