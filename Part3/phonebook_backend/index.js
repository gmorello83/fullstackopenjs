require('dotenv').config()
const express = require('express');
const morgan = require('morgan'); //log tools
// const cors = require('cors')
const Person = require('./models/person')


const app = express()

app.use(express.json())
app.use(morgan('tiny'))
// app.use(cors())
app.use(express.static('dist'))

app.get('/ping', (request, response) => {
    response.send('Phonebook Api is up !')
})

app.get('/api/info', (request, response) => {
    const now = new Date()
    Person.countDocuments({})
        .then(count => {
            return response.send(`<p>Phonebook has info for ${count} people</p><p>${now}</p>`);
        })

})

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(result => {
            return response.json(result);
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;

    Person
        .findById(id)
        .then(result => {
            if (!result) {
                return response.status(404).send('Not found')
            }
            response.json(result)
        })
        .catch(error => {
            next(error);
        }
        )

})

app.post('/api/persons', (request, response, next) => {

    const body = request.body;
    if (!body)
        return response.status(400).send('not avaible body');

    if (!body.name)
        return response.status(400).send('name missing');

    if (!body.number)
        return response.status(400).send('number missing');

    else {
        Person.findOne({ name: body.name })
            .then(exist => {
                if (exist)
                    return response.status(409).json({ conflict: 'Name already exists' });

                const newPerson = new Person({
                    name: body.name,
                    number: body.number
                });

                console.log('creation');

                newPerson
                    .save()
                    .then(result => {
                        return response.json(result);
                    })
                    .catch(error => {
                        next(error);
                    })

            })

    }

})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    const body = request.body;

    if (!body) { return response.status(400).send('not avaible body'); }
    if (!body.name) { return response.status(400).send('name missing'); }
    if (!body.number) { return response.status(400).send('number missing'); }

    Person
        .findByIdAndUpdate(id, { name: body.name, number: body.number })
        .then(result => {
            if (!result) { return response.status(404).send('Not found') }
            console.log('PUT /person/id - before :', result);
            Person.findById(id)
                .then(result => {
                    console.log('PUT /person/id - after :', result);
                    return response.json(result);
                })
                .catch(error => {next(error);})

        })
        .catch(error => {
            next(error);
        })
})


app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    Person
        .findByIdAndDelete(id)
        .then(result => {
            console.log('delete result:', result)
            return response.status(204).end();
        })
        .catch(error => {
            next(error);
        })
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)


const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    console.error(error.message)
    return response.status(500).send({ error: 'Unknown server error' })

    next(error)
}
app.use(errorHandler);