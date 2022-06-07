import { useState, useEffect } from "react";
import axios from "axios";
import areTheseObjectsEqual from "./components/AreTheseObjectsEqual";
import PersonsList from "./components/PersonsList";
import EntryForm from "./components/EntryForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setPersonsToShow(response.data);
    });
  }, []);

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
