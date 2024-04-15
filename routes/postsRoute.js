const express = require('express')
const router = express.Router()
const controller = require('../controllers/postsController')
const globalmiddleware = require('../middlewares/globalMiddlewares')

router.post('/', globalmiddleware.bearerTokenAuth, controller.createPost)
router.put('/:id', globalmiddleware.bearerTokenAuth, controller.updatePost)
router.get('/', globalmiddleware.bearerTokenAuth, controller.getAllPosts)
router.get('/:id', globalmiddleware.bearerTokenAuth, controller.getOnePost)
router.delete('/:id', globalmiddleware.bearerTokenAuth, controller.deleteOnePost)




module.exports = router