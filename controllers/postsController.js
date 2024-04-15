const postsModel = require('../models/postsModel')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')


 const createPost= async (req, res)=>{
    //   
    req.body.user = req.user._id

    const newPost= req.body


     try {

        const post =   await postsModel.create(newPost)
        const data = await postsModel.findById(post._id).populate({path: 'user', select: '-password -__v'}).select('-__v')
            res.status(201).json({
              message: 'Post created',
                data
            })
        }
   
      catch (error) {
        res.status(401).json({
            message: 'an error occured',
            data: error

        })
     }

    
}


const updatePost = async(req, res)=>{
  try {

    const postId= req.params.id
    const detailsToUpdate = req.body

  const foundandUpdatedbyId = await postsModel.findByIdAndUpdate(postId, detailsToUpdate,{new: true}).populate({path: 'user', select: '-password -__v'}).select('-__v')
  res.status(200).json({
    message: 'Post updated successfully',
    data: foundandUpdatedbyId
  })
  } catch (error) {
    res.status(400).json({
      message: 'Bad Request, --- possibly validation failure',
      error
    })
  }
    
}

const getAllPosts = async (req, res)=>{

try {
  const query = req.query
  const page = Number(query.page)|| 1
  const limit = Number(query.limit) || 10
  
console.log(query)

  const posts = await postsModel.find({}).populate('user').sort({createdAt: -1}).skip((page - 1) *limit).limit(limit)
  console.log(posts)


  res.status(200).json({
    message: 'All posts',
  posts 
})
  
} catch (error) {
  res.status(400).json({
    message: 'Bad Request--- possibly validation failure',
    error
  })
}
  
}



const getOnePost = async(req, res)=>{

try {

  const postId= req.params.id
const post = await postsModel.findById(postId).populate({path: 'user', select: '-password -__v'}).select('-__v')

if (!post){
 return res.status(404).json({
    message: 'Post not found'
})
}

res.status(200).json({post})
console.log(postId)
}

catch (error) {
  
res.status(400).json({
  message: 'Bad Request, --- possibly validation failure',
    error
})
  }

}

const deleteOnePost = async(req, res)=>{

  try {
    
  const postId= req.params.id

 const post = await postsModel.findById(postId)

 
 if (!post){ 
   return res.status(404).json({
        message: 'Post not found'
    })
    
 }
 if (post.user!== req.user._id){
  return res.status(401).json({
    message: 'Unauthorized'
})
}

 await post.deleteOne()

res.status(204).json({})

  } catch (error) {
    res.status(400).json({
      message: 'Bad Request, --- possibly validation failure',
    error 
    })
  }
}


module.exports = {
    createPost,
    updatePost,
    getAllPosts,
    getOnePost,
    deleteOnePost
}