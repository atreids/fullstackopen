import { CoursePart } from "../App";

interface TotalProps {
  courseParts: CoursePart[];
}

const Total = ({ courseParts }: TotalProps) => {
  return (
    <>
      <h2>
        Number of exercises:{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </h2>
    </>
  );
};

export default Total;
