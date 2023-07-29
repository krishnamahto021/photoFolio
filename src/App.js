import { NavBar } from "./components/NavBar/NavBar";
import { AlbumList } from "./components/Album/AlbumList/AlbumList";
import { useEffect, useReducer, useState } from "react";
import { db } from "./firebaseinit";
import { addDoc, arrayUnion, collection, onSnapshot, updateDoc, doc, query, where } from "firebase/firestore";
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

    case 'ADD_ALBUM': {
      return {
        titles: [payload.album, ...state.titles]
      }
    }



    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { titles: [] });
  const [showForm, setShowForm] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedAlbumTitle,setSelectedAlbumTitle] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

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


  // fetch images from album
  const fetchImagesForAlbum = async () => {
    if (selectedAlbum) {
      setLoading(true);
      const imagesRef = collection(db, 'images');
      const q = query(imagesRef, where('albumRef', '==', selectedAlbum));
      const unsub = onSnapshot(q, (snapshot) => {
        const fetchedImages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setImages(fetchedImages);
        setLoading(false); // Set loading to false after images are fetched
      });
      return unsub;
    }
  };

  useEffect(() => {
    const unsubscribe = fetchImagesForAlbum();
  }, [selectedAlbum]);




  const addAlbum = async (album) => {
    try {
      const albumRef = collection(db, 'photofolio');
      const docRef = await addDoc(albumRef, { ...album });

      dispatch({
        type: 'ADD_ALBUM',
        payload: { album: { id: docRef.id, ...album } }
      });

      // Get the current state of titles
      const currentTitles = state.titles;

      // Prepend the new album to the existing titles
      const updatedTitles = [{ id: docRef.id, ...album }, ...currentTitles];

      // Update the state with the new order
      dispatch({ type: 'GET', payload: { titles: updatedTitles } });
    } catch (err) {
      console.error('Error in adding album', err);
    }
  };

  const addImage = async (data) => {
    const { title, url } = data;
    const albumRef = selectedAlbum;
    const imageRef = await addDoc(collection(db, 'images'), { title, url, albumRef });
    // update the imagesArray in the selectedAlbum
    if (selectedAlbum) {
      const albumDocRef = doc(db, 'photofolio', selectedAlbum);
      await updateDoc(albumDocRef, {
        imagesArray: arrayUnion(imageRef)
      })
    }
  }



  const router = createBrowserRouter([
    {
      path: '/', element: <>
        <NavBar />
        <AlbumList addAlbum={addAlbum} titles={state.titles} setSelectedAlbum={setSelectedAlbum} setSelectedAlbumTitle={setSelectedAlbumTitle} />
      </>
    },
    {
      path: '/image-list', element: <>
        <NavBar />
        {showForm ? <ImageForm selectedAlbum={selectedAlbum} addImage={addImage} title={selectedAlbumTitle} /> : null}
        <ImageList showForm={showForm}  setShowForm={setShowForm} addImage={addImage} images={images} loading={loading} title={selectedAlbumTitle} />
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
