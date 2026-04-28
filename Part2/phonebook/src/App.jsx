import { Component, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [displayedPersons, setDisplayedPersons] = useState(persons);

  const [newName, setName] = useState('');
  const handleNameChange = (event) => setName(event.target.value);

  const [newNumber, setNumber] = useState('');
  const handleNumberChange = (event) => setNumber(event.target.value)

  const [search, setSearch] = useState('');
  const handleSearchChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch);
    const personsUpdated = persons.filter((p) => p.name.toLowerCase().includes(newSearch.toLowerCase()));
    setDisplayedPersons(personsUpdated);
  }

  const addNumber = (event) => {
    event.preventDefault()

    if (newName === '') alert(`Please can you fill the name`)
    else if (newNumber === '') alert(`Please can you fill the phone number`)
    else if (persons.find((p) => p.name === newName)) alert(`${newName} is already added to phonebook`)
    else if (persons.find((p) => p.number === newNumber)) alert(`${newNumber} is already added to phonebook`)
    else {
      let maxId = Math.max(...persons.map(p => p.id));
      maxId++;
      const personsUpdated = persons.concat({ name: newName, number: newNumber, id: maxId });
      console.log(personsUpdated);
      setPersons(personsUpdated);
      const personsfiltered =personsUpdated.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
      setDisplayedPersons(personsfiltered);
      setName('');
      setNumber('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={search}
        onChange={handleSearchChange} />
      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addNumber} />
      <Numbers 
        persons={displayedPersons} />
    </div>
  )
}

export default App