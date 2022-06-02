import React from "react";

const ExercisesSum = ({ parts }) => {
  const sum = parts.reduce((previous, current) => {
    const result = previous.exercises + current.exercises;
    return { exercises: result };
  });

  return <p>Sum of exercises: {sum.exercises}</p>;
};

export default ExercisesSum;
