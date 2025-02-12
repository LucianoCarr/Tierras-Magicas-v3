require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const methodOverride = require('method-override')
const createError = require('http-errors')

const characterRouter = require('../src/routers/character.Routes')
const realmRouter = require('../src/routers/realm.Routes')

const app = express()
const port = 5000


// Configuración de middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname + '/../public')))

//Conexcion con el front-end de angular
app.use(cors({
  origin: 'http://localhost:4200', // Cambia esto por la URL del frontend en producción
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

//Rutas
app.get('/', (req, res) => {
    res.json({ mensaje: 'Servidor funcionando correctamente' });
  });
  
app.use('/character', characterRouter)
app.use('/realm', realmRouter)


//errores
app.use(function(req, res, next) {
    next(createError(404));
  });

  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).json({
          error: {
            message: err.message,
          },
        });
      });
      
  });

app.listen(port, () => {
    console.log(`Servidor: Tierras Magicas ==> http://localhost:${port}`);
})