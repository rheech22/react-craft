import {
  Children,
  isValidElement,
  useEffect,
  useState,
  type ReactElement,
} from "react";
import "./App.css";

const getCurrentPath = () => {
  return window.location.hash.replace(/^#/, "") || "/";
};

// router
type RouteProps = {
  path: string;
  element: ReactElement;
};

const HashRouter = ({ children }: { children: ReactElement[] }) => {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(getCurrentPath());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const match = Children.toArray(children).find((child) => {
    if (!isValidElement<RouteProps>(child)) return false;
    return child.props.path === currentPath;
  }) as ReactElement<RouteProps> | undefined;

  return <>{match ? match.props.element : <div>404 Not Found</div>}</>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Route = (_: RouteProps) => {
  return null;
};

// pages
const HomePage = () => <div>Home Page</div>;
const AboutPage = () => <div>About Page</div>;

// entry
function JSXRouteVersion() {
  return (
    <HashRouter>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </HashRouter>
  );
}

export default JSXRouteVersion;
