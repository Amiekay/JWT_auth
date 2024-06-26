const express = require('express')
const app = express()
const connectToMongodb = require('../db')
const postsRoute = require('../routes/postsRoute')
const userRoute = require('../routes/userRoute')

connectToMongodb()

app.use(express.json())

app.set('view engine', 'ejs')

app.use('/', userRoute)
app.use('/posts', postsRoute)

// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        data: null,
        error: 'Server Error'
    })
})


module.exports = app

