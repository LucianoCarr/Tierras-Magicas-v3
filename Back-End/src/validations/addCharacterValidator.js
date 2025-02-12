const {check} = require('express-validator')

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({
        min:3,
    }).withMessage('Minimo 3 letras')
    .isAlpha("es-ES",{
        ignore:' ',
        }).withMessage('Solo letras'),

    check('realm')
    .notEmpty().withMessage('Elige un Reino'),
    
    check('power')
    .notEmpty().withMessage('El poder es obligatorio')
    .isInt({
        get:1,
    }).withMessage('Solo un numero')
    .isLength({
        max:2,
    }).withMessage('Maximo dos digitos'),

    check('element')
    .notEmpty().withMessage('Elige un elemento'),
    
]