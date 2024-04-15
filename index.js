const express = require('express')
const app = express()
const connectToMongodb = require('./db')
const booksroute = require('./routes/bookRoutes')
const userRoute = require('./routes/userRoute')

const PORT = 3000

connectToMongodb()

app.use(express.json())


app.use('/users', userRoute)
app.use('/books', booksroute)



app.get("/", (req, res) => {
    res.status(200).json( { msg: "Welcome" });
});

// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        data: null,
        error: 'Server Error'
    })

})


app.listen(PORT, ()=>{
console.log(`server connected successfully at http://localhost:${PORT}`)
})


