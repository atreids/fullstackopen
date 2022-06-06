import { CoursePart } from "../App";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return <Part parts={courseParts} />;
};

export default Content;
