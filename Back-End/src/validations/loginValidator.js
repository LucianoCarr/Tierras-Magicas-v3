const { check, body } = require("express-validator");
const db = require('../database/models')

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
          if(!user || !compareSync(value, user.password)){
            return Promise.reject()
          } 
      }).catch(() => Promise.reject('Credenciales inválidas'))
      }) 
  
  ];