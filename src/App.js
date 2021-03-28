import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person }) => {
  return (
    <p>{person.name}: {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject ={
      name: newName,
      number: newNumber,
    }

    for (const person of persons) {
      if (person.name.toLowerCase() === nameObject.name.toLowerCase()) {
        if (window.confirm(`${nameObject.name} is already added to the phonebook. Replace the old number with a new one?`)) {
            personService
              .update(person.id, nameObject)
              .then(updatedName => {
                setPersons(persons.map(personArr => personArr.id !== person.id ? personArr : updatedName))
                setNewName('')
                setNewNumber('')
              })
            return
        } else {
          return
        }
      }
    }
    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deleteName = (id) => {
    personService
      .deletePerson(id)
      .then(deletedPerson => {
        setPersons(persons.filter(p => p.id !== id))
      })
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
    ? persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
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
      {personsToFilter.map( person => {
        return (
          <div key={person.id}>
            <Person  person={person} />
            <button onClick={()=>deleteName(person.id)}>delete</button>
          </div>
        )
      }
      )}
    </div>
  )
}

export default App
