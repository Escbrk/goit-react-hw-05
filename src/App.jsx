import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import data from "../movie-api";

const App = () => {
  try {
    const getData = data("?include_adult=false&language=en-US&page=1");

    return getData;
  } catch (error) {}

  return (
    <div>
      <Navigation />
    </div>
  );
};

export default App;
