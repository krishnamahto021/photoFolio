import { NavBar } from "./components/NavBar/NavBar";
import { AlbumList } from "./components/Album/AlbumList/AlbumList";
import { useEffect, useReducer} from "react";
import { db } from "./firebaseinit";
import { addDoc, collection, onSnapshot} from "firebase/firestore";

const reducer =(state,action)=>{
  const{payload}  = action;
  switch(action.type){
    case 'GET' :{
      return{
        titles:payload.titles
      }
    }

    case 'ADD' :{
      return{
        titles:[payload.title,...state.titles]
      }
    }

    default:
      return state;
  }
}

function App() {
  // const [title,setTitle] = useState([]);
  // async function fetchData () {
  //   const docRef = collection(db,'photofolio');
  //   const snapShot = await getDocs(docRef);
  //   const titlesArray = snapShot.docs.map((doc)=>{
  //     return{
  //       id:doc.id,
  //       ...doc.data()
  //     }
  //   });
  //   setTitle(titlesArray);
  //   console.log(titlesArray);
  //   return titlesArray;    
  // }
  const [state,dispatch] = useReducer(reducer,{titles:[]});

  const getTitle = async () => {
    const unsub = onSnapshot(collection(db,'photofolio'),(snapshot)=> {
      const titles = snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
      }));
      dispatch({type:'GET',payload:{titles}});
    })
  }

  useEffect(()=>{
    getTitle();
  },[]);

  const addTitle = async(title)=>{
    const titleRef = collection(db,'photofolio');
    const docRef = await addDoc(titleRef,title);

    dispatch({
      type:'ADD',
      payload:{title:{id:docRef.id,...title}}
    });





  }



  return (

    <>
    <div className="App">
    <NavBar/>
    <AlbumList addTitle={addTitle} titles={state.titles} />

    </div>
    </>
  );
}

export default App;
