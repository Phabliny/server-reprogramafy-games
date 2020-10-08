const express = require('express')
const router = express.Router()
const controller = require('../controller/gamesController')

router.get('/', controller.GetAll)
router.get('/:id', controller.getById)

module.exports = router