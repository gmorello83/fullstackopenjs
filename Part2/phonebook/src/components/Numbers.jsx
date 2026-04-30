import React from "react"
import personsService from '../services/persons'

const Numbers = ({ persons, onDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id}>
              <td>
                {person.name} - {person.number} 
              </td>
              <td>
                <button onClick={() => onDelete(person.id)}>Supprimer</button>
              </td> 
            </tr>))}
        </tbody>
      </table>
    </>
  )
}

export default Numbers