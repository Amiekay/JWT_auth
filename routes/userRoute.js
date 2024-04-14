const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')
const globalmiddleware = require('../middlewares/globalMiddlewares')



// Create user
router.post('/register', controller.createUser)

// Signin user
router.post('/login', controller.Login)



module.exports = router