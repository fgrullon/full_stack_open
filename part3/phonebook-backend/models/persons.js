const mongoose = require('mongoose');
const process = require('process');

const MONGO_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI);

const personSchema = new mongoose.Schema({
    name: {
        type : String,
        minLength : 3,
        required : true
    },
    number: {
        type: String,
        minLength : 8,
        validate: 
        { validator: function(v) { return /\d{2}-\d{7}/.test(v) || /\d{3}-\d{8}/.test(v); },message: props => `${props.value} is not a valid phone number!`
        }
    }
});


module.exports = mongoose.model('Person', personSchema);

