const express = require('express')
const path = require('path')
const MobileDetect = require('mobile-detect')
const app = express()
const Generador = require('../server_modules/Generador')
const Util = require('../server_modules/Util')
let mongoose = require('mongoose')
let cors = require('cors')
const carreraRoute = require('./routes/carrera.routes')
const teoricoRoute = require('./routes/teorico.routes')
const practicoRoute = require('./routes/practico.routes')
const profesorRoute = require('./routes/profesor.routes')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', '..', 'build')))

const PORT = 8085
app.set('port', process.env.PORT || PORT)

app.put('/generar', function (req, res) {
  let xforwardedfor = req['headers']['x-forwarded-for']
  console.log("Generando horarios... , x-forwarded-for: "+xforwardedfor)
  if (typeof req.body !== 'undefined') {
    const paquetes = req.body
    const castFunction = (paquete) => {
      return { paquete: paquete }
    }
    const paquetesObj = paquetes.map(castFunction)
    const generador = new Generador(paquetesObj)
    //console.log(generador.HorariosGenerados)
    res.send(generador.HorariosGenerados.map((horario) => horario.materias))
  } else {
    res.send([null])
  }
})

app.use(cors())
app.use('/carrera', carreraRoute)
app.use('/teorico', teoricoRoute)
app.use('/practico', practicoRoute)
app.use('/profesor', profesorRoute)

mongoose.Promise = global.Promise
mongoose
  .connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: process.env.DB_NAME,
  })
  .then(
    (p) => {
      console.log('Database connected sucessfully !')
    },
    (error) => {
      console.log('Database could not be connected : ' + error)
    }
  )
//Nuevo fin

app.get('/ping', function (req, res) {
  return res.send('pong')
})

app.get('/redirigir', async function (req, res) {
  let info = await Util.usageCPU_MEN()
  if (!info) {
    res.send({ permiso: true })
  } else {
    res.send({ permiso: false })
  }
})

app.get('/isMobile', async function (req, res) {
  let info = await Util.usageCPU_MEN()
  let xforwardedfor = req['headers']['x-forwarded-for']
  console.log("Is mobile: ... , x-forwarded-for: "+xforwardedfor)
  let link_origen = req.headers.host
  if (info) {
    let link =
      link_origen === 'https://mihorarioweb.azurewebsites.net'
        ? 'https://mihorarioweb.herokuapp.com'
        : 'https://mihorarioweb.azurewebsites.net'
    console.log(link)

    res.send({ redirigir: true, ruta: link })
  } else {
    let detector = new MobileDetect(req.headers['user-agent'])
    console.log("OS client: " + detector.os())
    res.send({ redirigir: false, data: detector.os() + '' })
  }
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'))
})

app.listen(app.get('port'), () => {
  console.log(`Server funcionando! ${app.get('port')} ${process.env.DB_NAME}`)
})
