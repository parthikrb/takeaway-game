import "./App.css";
import { Header } from "./Components/Header/Header";
import Room from "./Containers/Room/Room";

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <Header />
        <Room />
      </div>
    </div>
  );
}

export default App;
