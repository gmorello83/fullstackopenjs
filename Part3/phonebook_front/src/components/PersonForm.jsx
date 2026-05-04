import React from "react"

const PersonForm = ({ name, number, onNameChange, onNumberChange, onSubmit }) => {

  return (
    <>
      <h2>Add a new</h2>
      <form>
        <div>
          name:
          <input
            value={name}
            onChange={onNameChange}
          /><br />
          phone:
          <input
            value={number}
            onChange={onNumberChange}
          />
        </div>
        <div>
          <button type="submit" onClick={onSubmit}>add</button>
        </div>
      </form>
    </>
  )

}

export default PersonForm