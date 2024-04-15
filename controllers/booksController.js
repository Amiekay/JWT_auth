const booksModel = require('../models/bookModel')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')


 const createBook = async (req, res)=>{
    //   
    const book = req.body

     try {

           await booksModel.create(book)
            res.status(200).json({
                book
            })
        }
   
      catch (error) {
        res.status(401).json({
            message: 'an error occured',
            data: error

        })
     }

    
console.log(book)
}


const updateBooks = async(req, res)=>{
  try {
    const token = req.headers.authorization.split(' ')[1]

    const postId= req.params.id
    const detailsToUpdate = req.body
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
//   const updatedBook=  await booksModel.findOneAndUpdate({email: decodedToken.email}, detailsToUpdate)
  const foundandUpdatedbyId = await booksModel.findByIdAndUpdate(postId, detailsToUpdate, {email: 0})
//   if (user.email === detailsToupdate.email)
  const user = await userModel.findById(decodedToken._id, {password: 0})
res.status(200).json({user, foundandUpdatedbyId})
// console.log(updatedBook)
console.log(postId)
  } catch (error) {
    res.status(400).json({
      message: 'Bad Request, --- possibly validation failure',
      error
    })
  }
    
}

const getAllbooks = async (req, res)=>{
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)

try {
  const query = req.query
  
console.log(query)

  const books = await booksModel.find({}, {email: 0}, {page: Number(query.page)}).limit(Number(query.limit)).sort({createdAt: -1})
  console.log(books)
  const user = await userModel.findById(decodedToken._id, {password: 0})


  res.status(200).json({
    message: 'All posts',
  books, user   
})
  
} catch (error) {
  res.status(400).json({
    message: 'Bad Request--- possibly validation failure',
    error
  })
}
  
}



const getOneBook = async(req, res)=>{

try {
  const token = req.headers.authorization.split(' ')[1]

  const postId= req.params.id
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
const foundBook = await booksModel.findById(postId, {email: 0})
const user = await userModel.findById(decodedToken._id, {password: 0})
// if (!foundBook){
//   res.status(404).json({
//     message: 'Post not found'
// })


res.status(200).json({foundBook, user})
console.log(postId)
}
catch (error) {
  
res.status(400).json({
  message: 'Bad Request, --- possibly validation failure',
    error
})
  }

}

const deleteOneBook = async(req, res)=>{

  try {
    
  const token = req.headers.authorization.split(' ')[1]

  const postId= req.params.id
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
  //   const updatedBook=  await booksModel.findOneAndUpdate({email: decodedToken.email}, detailsToUpdate)

 const one = await booksModel.findByIdAndDelete(postId).where(email === decodedToken.email)

const user = await userModel.findById(decodedToken._id, {password: 0})
res.status(200).json({user, one})

console.log(postId)
  } catch (error) {
    res.status(400).json({
      message: 'Bad Request, --- possibly validation failure',
    error 
    })
  }
}


module.exports = {
    createBook,
    updateBooks,
    getAllbooks,
    getOneBook,
    deleteOneBook
}