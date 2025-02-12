const express = require('express')
const { all, detail, admin, create, edit, destroy } = require('../controllers/realmController')
const router = express.Router()
const upload = require('../middleWares/upload')
/* validaciones */
const realmValidator = require('../validations/realmValidator')


/*    /realm    */
router.get('/all', all)
router.get('/detail/:id', detail)
router.get('/admin', admin)
router.post('/create', upload.single('image'), realmValidator, create)
router.put('/edit/:id', upload.single('image'), realmValidator, edit)
router.delete('/delete/:id', destroy)


module.exports = router