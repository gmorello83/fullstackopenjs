const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Phonebook Api is up !</h1>')
})

app.get('/api/info', (request, response) => {
    const now = new Date()
    response.send(
        `Phonebook has info for ${persons.length}people<br/>
        ${now}
        `);
})

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    console.log('GET /api/persons/:id',request.params.id);
    
    const person = persons.find(p => p.id === id);

    if (person) {
        console.log('GET /api/persons/:id - found');
        return response.json(person);    
    } else {
        console.log('GET /api/persons/:id - not found');
        return response.status(404).send('Not found');
    }
    
})

app.post('/api/persons', (request, response) => {
    console.log("POST /api/persons :", request.body);
    const body = request.body;
    if (!body) 
        return response.status(400).send('no avaible body')
    
    if (!body.name)
        return response.status(400).send('name missing')
    else{
        const found = persons.find((p) => p.name === body.name);
        if (found) 
            return response.status(409).send('Name already exists');
    }
    if (!body.number) 
        return response.status(400).send('number missing');
    

    const id = Math.floor(Math.random() * 10000).toString();
    const person = {
        id: id,
        name: body.name,
        number: body.number,
    };

    persons = persons.concat(person);

    response.json(person);

})

app.delete('/api/persons/:id', (request, response) => {
    console.log('/api/persons/:id', request.params.id);
    
    const id = request.params.id;   
    persons = persons.filter(p => p.id !== id);

    response.status(204).end();
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)