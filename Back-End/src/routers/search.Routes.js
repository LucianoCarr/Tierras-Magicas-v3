const express = require('express');
const searchController  = require('../controllers/searchController')

const router = express.Router();


/* /search */
router.get('/', searchController.search)

module.exports = router