const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()



const createUser = async (req, res)=>{
const user = req.body

try {
    const existingUser = await userModel.findOne({email: user.email})
    if(existingUser){
        return res.status(409).json({
            message: 'user already created'
        })
    }
    const createdUser = await userModel.create({
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    })
    const token =  await jwt.sign({email: createdUser.email, _id: createdUser._id}, process.env.JWT_SECRET)


    res.status(200).json({
        token,
        message: 'Registered successfuly',
        data: {
            name: createdUser.name,
            email: createdUser.email,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt
        }
    })
} catch (error) {
    res.status(400).json({
        message: 'an error occured',
        data: error

    })
}

}

const Login = async(req, res)=>{
 const {email, password} = req.body
//  console.log(email,password)
 try {
    // check if user exists
    const user= await userModel.findOne({
        email: email
    })

    if(!user){
       return res.status(401).json({
            message:'Unauthorized'   
        })
    }
    
        const validPassword = await user.isValidPassword(password)
    
        if (!validPassword) {
            return res.status(422).json({
                message: 'Email or password is not correct',
            }) 
        }
    
        const token = await jwt.sign({ email: user.email, _id: user._id}, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' })
        res.status(200).json({
        message: 'Login successful',
        token: token,
        data: {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt

    }
})

 } catch (error) {
    res.status(401).json({
        message: 'Bad Request',
        error: error
    })
 }

}


module.exports = {createUser, Login}