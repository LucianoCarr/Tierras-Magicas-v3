const express = require('express');
const db = require('../database/models');
const {register, login, exit} = require('../controllers/userController');
/* Sessions */
const sessionCheckLogin = require('../middleWares/sessionCheckLogin');
/* Validators */
const registerValidator = require('../validations/resgisterValidator');
const loginValidator = require('../validations/loginValidator');

const router = express.Router();

/* Obtener todos los usuarios */
router.get('/', async (req, res) => {
    try {
      const users = await db.User.findAll();
      res.json(users);
    } catch (error) {
      console.error("Error en GET /user:", error);
      res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
  });

  /* Obtener usuarios por ID */
  router.get('/:id', async (req, res) => {
    try {
      const user = await db.User.findByPk(req.params.id); // Busca por clave primaria
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      res.json(user);
    } catch (error) {
      console.error("Error en GET /user/:id:", error);
      res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
    }
  });
  


/*  /user */

//registro
router.post('/register', sessionCheckLogin, registerValidator, register);
//login
router.post('/login', sessionCheckLogin, loginValidator, login)
//logout
router.post('/logout', exit)

module.exports = router