const {check, body} = require('express-validator')
const db = require('../database/models')

module.exports = [
  check("name")
    .isLength({
      min: 2,
    })
    .withMessage("El nombre es obligatorio")
    .isAlpha("es-ES",{
      ignore:' '
    })
    .withMessage("Solo letras"),
  check("lastName")
    .isLength({
      min: 2,
    })
    .withMessage("El apellido es obligatorio")
    .isAlpha("es-ES",{
      ignore:' '
    })
    .withMessage("Solo letras"),
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Formato inválido")
    .custom((value, { req }) => {
      return   db.User.findOne({where : {email:value}})

      .then(user => {
        if(user){
          return Promise.reject()
        }
      })
      .catch(error => {
        console.log(error);
        return Promise.reject("El email ya se encuentra registrado")
      })

    }),
  check("password").isLength({
    min: 6,
    max: 12,
  })
  .withMessage('La contraseña debe requerir al menos 6 caracteres'),
  body('password2')
    .custom((value,{req}) => {
        if(value !== req.body.password){
            return false
        }
        return true
    }).withMessage('Las contraseñas no coinciden')
];
