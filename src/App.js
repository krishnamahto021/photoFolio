import { db } from "./firebaseinit";
import { NavBar } from "./components/NavBar/NavBar";
import { AlbumList } from "./components/Album/AlbumList/AlbumList";

function App() {
  return (
    <>
    <div className="App">
    <NavBar/>
    <AlbumList/>

    </div>
    </>
  );
}

export default App;
