import React from "react";
import Parts from "./Parts";
import ExercisesSum from "./ExercisesSum";

const Course = ({ courses }) => {
  const list = courses.map((course) => (
    <>
      <h1>{course.name}</h1>
      <Parts parts={course.parts} />
      <ExercisesSum parts={course.parts} />
    </>
  ));

  return list;
};

export default Course;
