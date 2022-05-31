import { useState, useEffect, useRef } from "react";

const Button = ({ onClick, name }) => {
  return <button onClick={onClick}>{name}</button>;
};

const Statistics = (props) => {
  if (props.stats.total === 0) {
    return <p>No feedback entered yet.</p>;
  }
  return (
    <>
      <h1>Stats</h1>
      <Display count={props.stats.good} name="Good" />
      <Display count={props.stats.neutral} name="Neutral" />
      <Display count={props.stats.bad} name="Bad" />
      <Display count={props.stats.total} name="Total" />
      <Display count={props.stats.avgScore} name="Average Score" />
    </>
  );
};

const Display = ({ count, name }) => {
  console.log(count);
  return (
    <p>
      {name}: {count}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const isMounted = useRef(false);
  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    avgScore: 0,
  });

  useEffect(() => {
    if (isMounted.current) {
      let avgScore = (stats.good / (stats.total + 1)) * 100;
      setStats({
        ...stats,
        total: stats.total + 1,
        avgScore: avgScore,
      });
    } else {
      isMounted.current = true;
    }
  }, [stats.good, stats.bad, stats.neutral]);

  const incGood = () => {
    setStats({
      ...stats,
      good: stats.good + 1,
    });
  };

  const incNeutral = () => {
    setStats({
      ...stats,
      neutral: stats.neutral + 1,
    });
  };

  const incBad = () => {
    setStats({
      ...stats,
      bad: stats.bad + 1,
    });
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={incGood} name="Good" />
      <Button onClick={incNeutral} name="Neutral" />
      <Button onClick={incBad} name="Bad" />
      <Statistics stats={stats} />
    </div>
  );
};

export default App;
