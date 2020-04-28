/*
Antiguo servidor























*/
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let database = require('./database/db');
const carreraRoute = require('./routes/carrera.routes')

//--------------Anterior
const path = require('path');
const MobileDetect = require('mobile-detect');
//-------------Anterior

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

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/carrera', carreraRoute)

//------------------------- anterior server
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));


app.get('/isMobile', function (req, res) {

    let detector = new MobileDetect(req.headers['user-agent']);
    let respuesta;
    console.log(detector);
    detector.os() != null ? respuesta = true : respuesta = false
    res.send(respuesta)
})
/*app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'..', 'public','index.html'));
});*/
//------------------Anterior server


const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log('Connected to port ' + 8080)
})
/*
app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});*/

