import { NavBar } from "./components/NavBar/NavBar";
import { AlbumList } from "./components/Album/AlbumList/AlbumList";
import { useEffect, useReducer, useState } from "react";
import { db } from "./firebaseinit";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
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

    case 'ADD': {
      return {
        titles: [payload.title, ...state.titles]
      }
    }

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { titles: [] });
  const [showForm, setShowForm] = useState(false);

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

  const addTitle = async (title) => {
    const titleRef = collection(db, 'photofolio');
    const docRef = await addDoc(titleRef, title);

    dispatch({
      type: 'ADD',
      payload: { title: { id: docRef.id, ...title } }
    });





  }

  const router = createBrowserRouter([
    {
      path: '/', element: <>
        <NavBar />
        <AlbumList addTitle={addTitle} titles={state.titles} />
      </>
    },
    {
      path: '/image-list', element: <>
        <NavBar />
        {showForm ? <ImageForm /> : null}
        <ImageList showForm={showForm} setShowForm={setShowForm} />
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
