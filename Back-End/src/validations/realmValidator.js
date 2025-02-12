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
    
]