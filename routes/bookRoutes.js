const express = require('express')
const router = express.Router()
const controller = require('../controllers/booksController')
const globalmiddleware = require('../middlewares/globalMiddlewares')

router.post('/', globalmiddleware.bearerTokenAuth, controller.createBook)
router.put('/:id', globalmiddleware.bearerTokenAuth, controller.updateBooks)
router.get('/', globalmiddleware.bearerTokenAuth, controller.getAllbooks)
router.get('/:id', globalmiddleware.bearerTokenAuth, controller.getOneBook)
router.delete('/:id', globalmiddleware.bearerTokenAuth, controller.deleteOneBook)




module.exports = router