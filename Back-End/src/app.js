require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const methodOverride = require('method-override')
const createError = require('http-errors')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('./database/models'); // Asegúrate de importar tu instancia de Sequelize


const characterRouter = require('../src/routers/character.Routes')
const realmRouter = require('../src/routers/realm.Routes')
const userRouter = require('../src/routers/user.Routes')

const app = express()
const port = 5000


// Configuración de middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname + '/../public')))

// Configuración de almacenamiento de sesiones (declarar antes de usar)
const store = new SequelizeStore({
  db: sequelize, // Usa la instancia de Sequelize importada arriba
});

store.sync(); // Sincronizar almacenamiento de sesiones

// Configuración de sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'login123',
  resave: false,
  saveUninitialized: false,
  store: store, // Aquí ya está declarado
  cookie: {
    maxAge: 10 * 60 * 1000, // 10 minutos
    secure: false, // Cambia a true si usas HTTPS
    httpOnly: true
  }
}));

// Sincronizar almacenamiento de sesiones
store.sync();

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
app.use('/user', userRouter)


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