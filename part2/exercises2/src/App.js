import { useState } from "react";
import areTheseObjectsEqual from "./components/AreTheseObjectsEqual";

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      number: "07872640044",
    },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {persons.map((person) => (
        <li key={person.number}>
          {person.name} {person.number}
        </li>
      ))}
    </div>
  );
};

export default App;
