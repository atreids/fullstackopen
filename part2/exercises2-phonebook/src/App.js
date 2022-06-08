import { useState, useEffect } from "react";
import PersonsList from "./components/PersonsList";
import EntryForm from "./components/EntryForm";
import Filter from "./components/Filter";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personServices.getAll().then((initialPhonebook) => {
      setPersons(initialPhonebook);
      setPersonsToShow(initialPhonebook);
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
    //preventing default page reload
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    //Checking if the person already exists within the phonebook
    for (const person of persons) {
      if (newPerson.name === person.name) {
        if (
          window.confirm(
            `${newPerson.name} already exists, replace the old number with a new number?`
          )
        ) {
          personServices.update(person.id, newPerson).then((updatedPerson) => {
            //updates displayed list by replacing the exisitng list with a new one where
            //only the updated record is replaced.
            setPersonsToShow(
              personsToShow.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
          });
        }
        setNewName("");
        setNewNumber("");
        return;
      }
    }

    //if person doesn't exist, this creates a new person, updates json-db and local state
    personServices.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setPersonsToShow(persons.concat(returnedPerson));
      setFilter("");
      setNewName("");
      setNewNumber("");
    });
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

  const handleDelete = (id, name) => {
    if (window.confirm(`Do you really want to delete '${name}'?`)) {
      personServices.deletePerson(id).then((response) => {
        alert(`${name} was deleted.`);
        setPersonsToShow(personsToShow.filter((person) => person.id !== id));
      });
    }
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
      <PersonsList personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
