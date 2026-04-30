import { useState, useEffect } from 'react'

import personsService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const handleAdding = (event) => {
  event.preventDefault()

  if (newName === '') {
    alert(`Please can you fill the name`);
    return;
  }

  if (newNumber === '') {
    alert(`Please can you fill the phone number`);
    return;
  }

  if (persons.find((p) => p.number === newNumber)) {
    alert(`${newNumber} is already added to phonebook`);
    return;
  }

  const person = persons.find((p) => p.name === newName)
  if ((person) && (confirm(`${newName} is already added to phonebook.\nwould you like to upadte the number`))) {
    console.log("update validated")
    personsService
      .update(person.id, { ...person, number: newNumber })
      .then(response => {          
        setPersons(persons.map(p => p.id === person.id ? response.data : p))
        setName('');
        setNumber('');
        showMessage({err:false, text:<><b>{person.name}</b>'s' number is updated.</>})
      })
      .catch(err => {
        console.log("Error during update validated")
        showMessage({err:true, text:<>Unable to update <b>{person.name}</b> number. Please try again.</>})
      })
    return;
  } 

  console.log("adding")
  let maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id)) + 1
    : 1;
  const newPersons = persons.concat();
  personsService
    .create({ name: newName, number: newNumber, id: maxId })
    .then(response => {
      setPersons(persons.concat(response.data));
      setName('');
      setNumber('');
      const message = 
      showMessage({err:false, text:<><b>{response.data.name}</b> is added to the phonebook</>})
    })
  }

  const handleDeleteNumber = (id) => {
      console.log('deleting')

      const person = persons.find(p => p.id === id);
      console.log('delete Number name :',person)
      if (confirm(`Confirmez-vous la suppression de ${person.name}`)) {

        personsService
          .deleteOne(id)
          .then(response => {
            console.log('delete confirmed :', response)
            setPersons(persons.filter(p => p.id !== id))
            showMessage({err:false, text:<><b>{response.data.name}</b> is deleted from the phonebook</>})
          })
          .catch(error => { 
            showMessage({err:true, text:<>Unable to delete <b>{person.name}</b> from the phonebook</>})
          })

      } else
        console.log('delete canceled');

  }

  const [newName, setName] = useState('');
  const handleNameChange = (event) => setName(event.target.value);

  const [newNumber, setNumber] = useState('');
  const handleNumberChange = (event) => setNumber(event.target.value);

  const [search, setSearch] = useState('');
  const handleSearchChange = (event) => setSearch(event.target.value);

  const [notifMessage, setNotifMessage] = useState(null);
  const showMessage = (message) => {
    setNotifMessage(message)
    setTimeout(() => {
      setNotifMessage(null)
    }, 3000)
  }
  
  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const displayedPersons = persons.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Notification message={notifMessage} />
      <h2>Phonebook</h2>
      <Filter
        value={search}
        onChange={handleSearchChange} />
      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={handleAdding} />
      <Numbers
        persons={displayedPersons}
        onDelete={handleDeleteNumber} />
    </div>
  )
}

export default App