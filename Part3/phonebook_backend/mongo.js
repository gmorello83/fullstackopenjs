const mongoose = require('mongoose')

console.log('START')
console.log('PARAMETERS :', process.argv.length)

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('You need to passe name and number argument')
  process.exit(1)
}


const password = encodeURIComponent(process.argv[2])
const uri = `mongodb://gmo:${password}@ac-chuwruo-shard-00-00.fudkn9z.mongodb.net:27017,ac-chuwruo-shard-00-01.fudkn9z.mongodb.net:27017,ac-chuwruo-shard-00-02.fudkn9z.mongodb.net:27017/phonebook?ssl=true&replicaSet=atlas-xn8444-shard-0&authSource=admin&appName=FullstackJS`
mongoose.set('strictQuery', false)
mongoose.connect(uri, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema, 'persons')


if (process.argv.length === 3) {
  console.log('Phonebook :')
  Person
    .find({})
    .then(result => {
      // console.log('result :', result);
      result.forEach(p => { console.log(`${p.name} ${p.number}`) })
      mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
  console.log('Adding :')
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })

  person
    .save()
    .then(() => {
      console.log(`added ${name} number-${number} to phonebook!`)
      mongoose.connection.close()
    })
}













