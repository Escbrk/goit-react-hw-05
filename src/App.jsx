import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import fetchMovie from "../movie-api";

const App = () => {
  try {
    const getData = fetchMovie("?include_adult=false&language=en-US&page=1");

    return getData;
  } catch (error) {}

  return (
    <div>
      <Navigation />
    </div>
  );
};

export default App;
