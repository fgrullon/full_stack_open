const mongoose = require('mongoose');

const process = require('process');


if(process.argv.length < 3){
    console.log('Password is required');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fgrullon:${password}@cluster0.dznlylr.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name : String,
    number : String
});

const Person = mongoose.model('Person', personSchema);


if(process.argv.length === 5){
    const person = new Person({
        name : process.argv[3],
        number : process.argv[4]
    });

    person.save().then(response => {
        console.log(`added ${response.name} ${response.number} to phonebook`);
        mongoose.connection.close();
    });
}else{
    Person.find({}).then(response => {
        console.log('phonebook:');
        
        response.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });

        mongoose.connection.close();
    });
}


