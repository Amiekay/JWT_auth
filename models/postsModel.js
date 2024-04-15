
const mongoose = require('mongoose')

const postModel = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },

    user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
    },

    createdAt:{
        type: Date,
        default: Date.now
    },

    updatedAt:{
        type: Date,
        default: Date.now
    }
}
    
)

module.exports = mongoose.model('Post', postModel)



