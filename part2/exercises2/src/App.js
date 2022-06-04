import { useState } from "react";
import areTheseObjectsEqual from "./components/AreTheseObjectsEqual";

const PersonsList = ({ persons }) => {
  return (
    <>
      <h2>Ledger:</h2>
      {persons.map((person) => (
        <li key={person.number}>
          {person.name} {person.number}
        </li>
      ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [filter, setFilter] = useState("");

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    updateList(newFilter);
  };

  const savePerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (personExist(newPerson)) {
      alert(newName + " already exists");
      setNewName("");
      setNewNumber("");
      return;
    }

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const personExist = (newPerson) => {
    for (const person of persons) {
      if (areTheseObjectsEqual(newPerson, person)) {
        return true;
      }
    }
    return false;
  };

  const updateList = (filter) => {
    if (filter === "") {
      setPersonsToShow(persons);
      return;
    }
    const initialValue = [];

    setPersonsToShow(
      persons.reduce((filteredPersons, currentPerson) => {
        if (currentPerson.name.includes(filter)) {
          filteredPersons.push(currentPerson);
          return filteredPersons;
        } else {
          return filteredPersons;
        }
      }, initialValue)
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter: <input value={filter} onChange={handleFilterChange} />
      </div>
      <form onSubmit={savePerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <PersonsList persons={personsToShow} />
    </div>
  );
};

export default App;
