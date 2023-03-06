const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

morgan.token('body', (req, res) => {
    if (!req.body ) {
        return '';
    }
    return JSON.stringify(req.body);
});

morgan.format('fso', `:method :url :status :res[content-length] - :response-time ms :body`)

app.use(morgan('fso'));

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];


app.get('/api/persons', (req, res) => {

    res.status(200).send(persons);
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
    let id = Math.floor((Math.random() * 100) + 10);

    const newPerson = {id, ...req.body};

    if(!newPerson.name || !newPerson.number) {
        return res.status(400).send({ 
            error :'The name or number is missing'
        });
    }
    const unique = persons.find(p => p.name.toLowerCase() === newPerson.name.toLowerCase());

    if(unique){
        return res.status(400).send({ 
            error : 'The name already exists in the phonebook'
        });
    }

    const newPersons = persons.concat(newPerson);

    res.status(201).send(newPerson);
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});