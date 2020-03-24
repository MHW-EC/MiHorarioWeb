const carreras = require("./server_resources/carreras")['carreras'];
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const MobileDetect = require('mobile-detect');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));


app.get('/ping', function (req, res) {
  
  return res.send('pong');
});

app.get('/isMobile', function(req, res){
  
  let detector = new MobileDetect(req.headers['user-agent']);
  let respuesta;

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