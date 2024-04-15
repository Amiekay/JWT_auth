const userModel = require('../models/userModel')
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')


app.use(express.json())

const checkBody = async (req, res, next) => {
    if (!req.body) {
        res.status(400).json({
            data: null,
            error: 'must have a body'
        })
    }
console.log(req.body)
    next()
}
    const bearerTokenAuth = async (req, res, next) => {
        try {
        const authHeader = req.headers;
    
        if (!authHeader.authorization) {
            return res.status(401).json({ message: 'You are not authenticated!' });
        }
    
        const token = authHeader.authorization.split(' ')[1]; // berear tokenvalue
    
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    
    
        const user = await userModel.findOne({ _id: decoded._id })
        
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            })
        }
    
        req.user = user;
    
        next()
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                message: "Unauthorized",
            })
        }
    }
    

module.exports = {
checkBody,
bearerTokenAuth
}