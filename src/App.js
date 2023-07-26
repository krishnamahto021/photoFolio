import { NavBar } from "./components/NavBar/NavBar";
import { AlbumList } from "./components/Album/AlbumList/AlbumList";
import { useState } from "react";



function App() {
  const [title,setTitle] = useState([]);
  return (
    <>
    <div className="App">
    <NavBar/>
    <AlbumList title={title} setTitle={setTitle} />

    </div>
    </>
  );
}

export default App;
