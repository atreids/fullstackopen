import { useState } from "react";
import areTheseObjectsEqual from "./components/AreTheseObjectsEqual";
import PersonsList from "./components/PersonsList";
import EntryForm from "./components/EntryForm";
import Filter from "./components/Filter";

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
    setPersonsToShow(persons.concat(newPerson));
    setFilter("");
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
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <EntryForm
        savePerson={savePerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <PersonsList personsToShow={personsToShow} />
    </div>
  );
};

export default App;
