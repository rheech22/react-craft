import { Link } from "react-router";

export const Home = () => {
  return (
    <ul>
      <li>
        <Link to="/rotation">Rotation</Link>
      </li>
      <li>
        <Link to="/stagger">Stagger</Link>
      </li>
    </ul>
  );
};
