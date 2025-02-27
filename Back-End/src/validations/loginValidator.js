const { check, body } = require("express-validator");
const db = require('../database/models')
const bcrypt = require('bcryptjs');

module.exports = [
    check("email")
      .notEmpty()
      .withMessage("El email es obligatorio").bail()
      .isEmail()
      .withMessage("Formato inválido").bail(),
    body("password")
      .custom((value, {req}) => {
        return db.User.findOne({
          where : {
              email : req.body.email
          }
      }).then(user => {
        if (!user || !bcrypt.compareSync(value, user.password)) {
          return Promise.reject("Credenciales inválidas");
        }
      }).catch(() => Promise.reject('Credenciales inválidas'))
      }) 
  
  ];