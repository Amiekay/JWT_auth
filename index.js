const express = require('express')
const mongoose = require('mongoose')
const app = express()
// const connectToMongodb = require('./db')
const booksroute = require('./routes/bookRoutes')
const userRoute = require('./routes/userRoute')
require('dotenv').config()
const PORT = process.env.PORT || 8600

const connectToMongodb= async () => {
  try {
     await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
     console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

//Connect to the database before listening
connectToMongodb().then(() => 
    app.listen(PORT, () => {
        console.log(`Server started on Port ${PORT}`)
    }
    ))


// app.get("/", (req, res) => {
//     res.status(200).json( { msg: "Welcome" });
// });
    

app.use(express.json())


app.use('/', userRoute)
app.use('/posts', booksroute)




// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        data: null,
        error: 'Server Error'
    })

})



