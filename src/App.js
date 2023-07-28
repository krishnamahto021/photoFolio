import { NavBar } from "./components/NavBar/NavBar";
import { AlbumList } from "./components/Album/AlbumList/AlbumList";
import { useEffect, useReducer, useState } from "react";
import { db } from "./firebaseinit";
import { addDoc, arrayUnion, collection, onSnapshot, updateDoc,doc } from "firebase/firestore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ImageList } from "./components/ImageContainer/ImageLIst/ImageList";
import { ImageForm } from "./components/ImageContainer/ImageForm/ImageForm";


const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'GET': {
      return {
        titles: payload.titles
      }
    } 

    case 'ADD_ALBUM':{
      return{
        titles:[payload.album,...state.titles]
      }
    }



    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { titles: [] });
  const [showForm, setShowForm] = useState(false);
  const [imageToAlbum,imageToAlbumDispatch] = useReducer(reducer,{});
  const [selectedAlbum,setSelectedAlbum] = useState(null);

  const getTitle = async () => {
    const unsub = onSnapshot(collection(db, 'photofolio'), (snapshot) => {
      const titles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch({ type: 'GET', payload: { titles } });
    })
  }

  useEffect(() => {
    getTitle();
  }, []);


  const addAlbum = async (album) => {
    try {
      const albumRef = collection(db, 'photofolio');
      const docRef = await addDoc(albumRef, { ...album});
  
      dispatch({
        type: 'ADD_ALBUM',
        payload: { album: { id: docRef.id, ...album} }
      });
      
      // Get the current state of titles
      const currentTitles = state.titles;
      
      // Prepend the new album to the existing titles
      const updatedTitles = [{ id: docRef.id, ...album}, ...currentTitles];
      
      // Update the state with the new order
      dispatch({ type: 'GET', payload: { titles: updatedTitles } });
    } catch (err) {
      console.error('Error in adding album', err);
    }
  };

  const addImage = async(data) =>{
    const {title,url} = data;
    const imageRef = await addDoc(collection(db,'images'),{title,url});
    // update the imagesArray in the selectedAlbum
    if(selectedAlbum){
      const albumDocRef = doc(db,'photofolio',selectedAlbum);
      await updateDoc(albumDocRef,{
        imagesArray:arrayUnion(imageRef)
      })
    }
  }



  const router = createBrowserRouter([
    {
      path: '/', element: <>
        <NavBar />
        <AlbumList addAlbum={addAlbum} titles={state.titles} setSelectedAlbum={setSelectedAlbum} />
      </>
    },
    {
      path: '/image-list', element: <>
        <NavBar />
        {showForm ? <ImageForm  selectedAlbum={selectedAlbum} addImage={addImage} /> : null}
        <ImageList showForm={showForm} setShowForm={setShowForm} addImage={addImage} />
      </>
    }

  ])

  return (

    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
