const express = require('express');
const db = require('../database/models');
const {register, login, profile, exit} = require('../controllers/userController');
/* Sessions */
const sessionCheckLogin = require('../middleWares/sessionCheckLogin');
const sessionProfile = require('../middleWares/sessionProfile')
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


/*  /user */
//registro
router.post('/register', sessionCheckLogin, registerValidator, register);
//login
router.post('/login', sessionCheckLogin, loginValidator, login);
//perfil
router.get('/profile', sessionProfile, profile)
//logout
router.post('/logout', exit)

module.exports = router