const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title : {
        type: String,
        required : true,
        unique : true,
        mingLength: 5
    },
    published : {
        type : Number
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Author'
    },
    genres : [
        { type : String }
    ]
})

module.exports = mongoose.model('Book', bookSchema)
