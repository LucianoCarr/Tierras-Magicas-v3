const express = require('express')
const { all, detail, create, edit, destroy } = require('../controllers//charactersController')
const router = express.Router()
const upload = require('../middleWares/upload')
/* validaciones */
const addCharacterValidator = require('../validations/addCharacterValidator')
const editCharacterValidator = require('../validations/editCharacterValidator')



/*    /character    */
router.get('/all', all)
router.get('/detail/:id', detail)
router.post('/create', upload.single('image'), addCharacterValidator, create)
router.put('/edit/:id', upload.single('image'), editCharacterValidator, edit)
router.delete('/delete/:id', destroy)


module.exports = router