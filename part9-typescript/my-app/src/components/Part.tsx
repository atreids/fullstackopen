import { CoursePart } from "../App";

interface PartProps {
  parts: CoursePart[];
}

const Part = ({ parts }: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  return (
    <>
      {parts.map((part) => {
        switch (part.type) {
          case "normal":
            return (
              <>
                <h2>
                  {part.name} {part.exerciseCount}
                </h2>
                <p>{part.description}</p>
              </>
            );
            break;
          case "groupProject":
            return (
              <>
                <h2>
                  {part.name} {part.exerciseCount}
                </h2>
                <p>Group Project count: {part.groupProjectCount}</p>
              </>
            );
            break;
          case "submission":
            return (
              <>
                <h2>
                  {part.name} {part.exerciseCount}
                </h2>
                <p>Group Project count: {part.description}</p>
              </>
            );
            break;
          case "special":
            return (
              <>
                <h2>
                  {part.name} {part.exerciseCount}
                </h2>
                <p>{part.description}</p>
                <p>Requirements: {part.requirements}</p>
              </>
            );
            break;
          default:
            return assertNever(part);
        }
      })}
    </>
  );
};

export default Part;
