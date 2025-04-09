import { useEffect, useState } from "react";
import "./App.css";

const getCurrentPath = () => {
  return window.location.hash.replace(/^#/, "") || "/";
};

// router
type Route = {
  path: string;
  component: React.ReactNode;
};

const HashRouter = ({ routes }: { routes: Route[] }) => {
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

  const route = routes.find((r) => r.path === currentPath);

  return <>{route ? route.component : <div>404 Not Found</div>}</>;
};

// pages
const HomePage = () => <div>Home Page</div>;
const AboutPage = () => <div>About Page</div>;

// entry
function App() {
  return (
    <HashRouter
      routes={[
        { path: "/", component: <HomePage /> },
        { path: "/about", component: <AboutPage /> },
      ]}
    />
  );
}

export default App;
