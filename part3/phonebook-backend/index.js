const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const Person = require('./models/persons');

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('build'))

morgan.token('body', (req, res) => {
    if (!req.body ) {
        return '';
    }
    return JSON.stringify(req.body);
});

morgan.format('fso', `:method :url :status :res[content-length] - :response-time ms :body`)

app.use(morgan('fso'));




app.get('/api/persons', (req, res, next) => {

    Person.find({})
    .then(persons => {
        res.status(200).send(persons);
    }).catch(error => next(error));
   
});

app.get('/info', (req, res) => {
    Person.find({}).then(response => {
        res.status(200).send(`<div>Phonebook has info for ${response.length} people</div> <br /> <div>${new Date()}</div>`);
    });


});

app.get('/api/persons/:id', (req, res) => {
    
    const id = req.params.id;

    Person.findById(id).then(response => {
        if(response){
            res.status(200).send(response)
        }else{
            res.status(404).send('Person not find')
        }
    });

});

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findOneAndRemove(req.params.id).then(response => {
        res.status(204).end();
    }).catch(error => next(error));
});




app.post('/api/persons', (req, res, next) => {

    const person = new Person({
        name: req.body.name,
        number: req.body.number
    });

    person.save()
        .then(response => {
            const id = response._id;
            const newPerson = {id, ...req.body};
            res.status(201).send(newPerson);
        })
        .catch(error => next(error));
    
});

app.put('/api/persons/:id', (req, res, next) => {

    const { name, number } = req.body;

    Person.findByIdAndUpdate(
            req.params.id,
            { name, number }, 
            { new: true, runValidators: true, context: 'query' })
        .then(person => res.json(person))
        .catch((error) => next(error));

});


const unkownEndPoint = (req, res) => {
    res.status(404).send({ error : 'unknown endpoint' });
}

app.use(unkownEndPoint);

const errorHandler = (error, req, res, next) => {

    if(error.name === 'CastError' && error.message.includes('ObjectId')){
        return res.status(400).send({ error : 'malformatted id'});
    }else if(error.name === 'ValidationError'){
        return res.status(400).json({ error : error.message });
    }

    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});