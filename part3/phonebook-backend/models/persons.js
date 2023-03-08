const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI);

const personSchema = new mongoose.Schema({
    name: {
        type : String,
        minLength : 3,
        required : true
    },
    number: String
});


module.exports = mongoose.model('Person', personSchema);

