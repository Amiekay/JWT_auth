const mongoose = require('mongoose')

const bookModel = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    year:{
        type:  Number,
        required: true,
        max: [2024, 'Year must be 2024 or below']
    },

    ISBN:{
        type: String,
        required: true,
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

module.exports = mongoose.model('newbooks', bookModel)



