import { NavBar } from "./components/NavBar/NavBar";
import { AlbumList } from "./components/Album/AlbumList/AlbumList";
import { useEffect, useReducer, useState } from "react";
import { db } from "./firebaseinit";
import { addDoc, arrayUnion, collection, onSnapshot, updateDoc, doc, query, where, deleteDoc, arrayRemove, setDoc } from "firebase/firestore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ImageList } from "./components/ImageContainer/ImageLIst/ImageList";
import { ImageForm } from "./components/ImageContainer/ImageForm/ImageForm";

// react toasts to show notifications
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
  const [selectedAlbumTitle, setSelectedAlbumTitle] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editImage, setEditImage] = useState(null);

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
      toast.success('Album Added successfully');

      // Get the current state of titles
      const currentTitles = state.titles;

      // Prepend the new album to the existing titles
      const updatedTitles = [{ id: docRef.id, ...album }, ...currentTitles];

      // Update the state with the new order
      dispatch({ type: 'GET', payload: { titles: updatedTitles } });
    } catch (err) {
      console.error('Error in adding album', err);
      toast.error('Error in creating Album');
    }
  };


  const addImage = async (data) => {
    const { title, url } = data;
    const albumRef = selectedAlbum;
    // Add a new image to Firestore
    const imageRef = await addDoc(collection(db, "images"), { title, url, albumRef });

    // Update the images state using functional update to avoid making copies
    // setImages((prevImages) => [{ title, url, albumRef, id: imageRef.id }, ...prevImages]);
    setImages([{ title, url, albumRef }, ...images]);

    // setting into the album
    const albumDocRef = doc(db, 'photofolio', selectedAlbum);
    await updateDoc(albumDocRef, {
      imagesArray: arrayUnion(imageRef)
    })

    toast.success('Image Added successfully');

  };

  const updateImage = async (data) => {
    const { title, url } = data;
    const albumRef = selectedAlbum;
    // Update the existing image in Firestore
    console.log(editImage);
    await updateDoc(doc(db, "images", editImage.id), {
      title,
      url,
      albumRef,
    });

    // Update the images state using functional update to avoid making copies
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === editImage.id ? { ...image, title, url } : image
      )
    );

    const albumDocRef = doc(db, 'photofolio', selectedAlbum);
    const imageRef = doc(db, 'images', editImage.id);
    await updateDoc(albumDocRef, {
      imagesArray: arrayUnion(imageRef)
    });

    toast.success('Image Updated Successfully');


    // Reset edit image and image form
    setEditImage(null);
    setShowForm(false);

  }


  const deleteImage = async (imageId) => {
    try {
      await deleteDoc(doc(db, 'images', imageId));

      // update the imagesArray field in album
      if (selectedAlbum) {
        const albumDocRef = doc(db, 'photofolio', selectedAlbum);
        await updateDoc(albumDocRef, {
          imagesArray: arrayRemove(doc(db, 'images', imageId))
        });
      }
      toast.success('Image deleted successfully');
    } catch (err) {
      console.error('Error in deleting the images', err);
      toast.error('error in deleting image');
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
        {showForm ? <ImageForm selectedAlbum={selectedAlbum} addImage={addImage} title={selectedAlbumTitle} editImage={editImage} updateImage={updateImage} /> : null}
        <ImageList showForm={showForm} setShowForm={setShowForm} addImage={addImage} images={images} loading={loading} title={selectedAlbumTitle} deleteImage={deleteImage} setEditImage={setEditImage} editImage={editImage} />
      </>
    }

  ])

  return (

    <>
      <div className="App">
        <ToastContainer />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
