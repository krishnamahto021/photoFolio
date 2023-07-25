import { db } from "./firebaseinit";
import { NavBar } from "./components/NavBar/NavBar";

function App() {
  console.log(db);
  return (
    <div className="App">
    <NavBar/>

    </div>
  );
}

export default App;
