import { useState, useEffect, useRef } from "react";

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
  const [total, setTotal] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      setTotal(total + 1);
      setAverageScore((good / (total + 1)) * 100);
    } else {
      isMounted.current = true;
    }
  }, [good, neutral, bad]);

  const incrementer = (rating) => {
    rating === "bad" ? setBad(bad + 1) : setBad(bad);
    rating === "good" ? setGood(good + 1) : setGood(good);
    rating === "neutral" ? setNeutral(neutral + 1) : setNeutral(neutral);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => incrementer("good")} name="Good" />
      <Button onClick={() => incrementer("neutral")} name="Neutral" />
      <Button onClick={() => incrementer("bad")} name="Bad" />
      <h1>Statistics</h1>
      <Display count={good} name="Good" />
      <Display count={neutral} name="Neutral" />
      <Display count={bad} name="Bad" />
      <Display count={total} name="Total" />
      <Display count={averageScore} name="Average Score" />
    </div>
  );
};

export default App;
