import { useState } from "react";

const Button = ({ onClick, name }) => {
  return <button onClick={onClick}>{name}</button>;
};

const Display = ({ count, name }) => {
  return (
    <p>
      {name}: {count}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={increaseGood} name="Good" />
      <Button onClick={increaseNeutral} name="Neutral" />
      <Button onClick={increaseBad} name="Bad" />
      <h1>Statistics</h1>
      <Display count={good} name="Good" />
      <Display count={neutral} name="Neutral" />
      <Display count={bad} name="Bad" />
    </div>
  );
};

export default App;
