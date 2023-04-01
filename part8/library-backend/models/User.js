const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type : String,
        unique : true,
        minLength : 5,
        required : true
    },
    favoriteGenre: {
        type: String
    }

})

module.exports = mongoose.model('User', userSchema)
