import React from "react";

const PersonsList = ({ personsToShow }) => {
  return (
    <>
      <h2>Ledger:</h2>
      {personsToShow.map((personsToShow) => (
        <li key={personsToShow.number}>
          {personsToShow.name} {personsToShow.number}
        </li>
      ))}
    </>
  );
};

export default PersonsList;
