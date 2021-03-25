import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name}: {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', id: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', id: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', id: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject ={
      name: newName,
      number: newNumber,
      id: newName
    }

    for (const person of persons) {
      if (person.name.toLowerCase() === nameObject.name.toLowerCase()) {
        return (
          window.alert(`${nameObject.name} is already in the phonebook.`),
          setNewName(''),
          setNewNumber('')
        )
      }
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  const personsToFilter = filterValue
    ? persons.filter(person => person.name.toLowerCase().includes(filterValue))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter: <input onChange={handleFilterChange} />
      </div>
      <h2>Add a New</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToFilter.map( person =>
        <Person key={person.id} person={person} />
      )}
    </div>
  )
}

export default App
