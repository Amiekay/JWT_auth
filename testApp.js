const express = require('express')
const app = express()
const booksroute = require('./routes/bookRoutes')
const userRoute = require('./routes/userRoute')
const PORT = 8600


app.use(express.json())


app.get('/users', async (req, res) => {
    const users = await UserModel.find({ email: 'amara@gmail.com' }).limit(2).select({ name: 1, _id: 1 })
    return res.json({
        users
    })})

app.use('/books', booksroute)

app.use('/users', userRoute)



app.get('*', (req, res) => {
    return res.status(404).json({
        data: null,
        error: 'Route not found'
    })
})

// globah error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        data: null,
        error: 'Server Error'
    })
})

module.exports = app;




