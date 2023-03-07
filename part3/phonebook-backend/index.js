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




app.get('/api/persons', (req, res) => {

    Person.find({}).then(persons => {
        res.status(200).send(persons);
    });
   
});

app.get('/info', (req, res) => {
    res.status(200).send(`<div>Phonebook has info for ${persons.length} people</div> <br /> <div>${new Date()}</div>`);

});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id);
    
    if(person){
        res.status(200).send(person)
    }else{
        res.status(404).send('Person not find')
    }

});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);

    const newPersons = [...persons.filter(p => p.id !== id)];
    console.log(newPersons)
    res.status(204).send();
});


app.post('/api/persons', (req, res) => {

    Person(res.body).save().then(response => {
        const id = response._id;
        const newPerson = {id, ...req.body};
        res.status(201).send(newPerson);
    });
    
});

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});