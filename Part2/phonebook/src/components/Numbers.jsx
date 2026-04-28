import React from "react"

const Numbers = ({ persons }) => {
  return (
    <>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map((person) => (<tr key={person.id}><td>{person.name} - {person.number}</td></tr>))}
        </tbody>
      </table>
    </>
  )
}

export default Numbers