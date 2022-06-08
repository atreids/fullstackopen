import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

interface InputFieldProps {
  search: string;
  updateSearch: (param: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ search, updateSearch }: InputFieldProps) => {
  return (
    <div>
      <p>Find Countries: </p>
      <input value={search} onChange={updateSearch} />
    </div>
  );
};

interface OutputFieldProps {
  matches: any;
  numOfMatches: number;
}

const OutputField = ({ matches, numOfMatches }: OutputFieldProps) => {
  if (numOfMatches === 0) {
    return <p>Please start typing a country name</p>;
  } else if (numOfMatches > 10) {
    return <p>Too many countries, please make your query more specific</p>;
  } else if (numOfMatches === 1) {
    return matches.map((match: any) => {
      return (
        <>
          <h2>{match.name.common}</h2>
          <p>Capital: {match.capital}</p>
          <p>Land area: {match.area}</p>
          <h3>Languages</h3>
          <p>{JSON.stringify(match.languages)}</p>
          <img
            src={match.flags.svg}
            alt="country flag"
            width="100"
            height="100"
          />
        </>
      );
    });
  } else {
    return matches.map((match: any) => {
      console.log(match);

      return <p>{match.name.official}</p>;
    });
  }
};

function App() {
  const [search, setSearch] = useState<string>("");
  const [numOfMatches, setNumOfMatches] = useState<number>(0);
  const [matches, setMatches] = useState<[]>([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/name/" + search)
      .then((response) => {
        console.log(response);
        setMatches(response.data);
        setNumOfMatches(response.data.length);
      })
      .catch((rejection) => {
        setNumOfMatches(0);
      });
  }, [search]);

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <h1>Country App</h1>
      <InputField search={search} updateSearch={handleFieldChange} />
      <OutputField matches={matches} numOfMatches={numOfMatches} />
      <p>current matches: {numOfMatches}</p>
    </>
  );
}

export default App;
