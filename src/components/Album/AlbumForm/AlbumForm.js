import { useRef} from 'react';
import styles from './albumForm.module.css';



export const AlbumForm = (props) => {
    // const { title, setTitle } = props;
    // const [form, setForm] = useState('');

    // function clearInput(e) {
    //     e.preventDefault();
    //     setForm('');
    // }

    // function handleChange(e) {
    //     setForm(e.target.value);
    // }

    // async function submitHandler(e) {
    //     e.preventDefault();
    //     setTitle([form,...title]);
    //     // set into the database
    //     const docRef = doc(collection(db,'photofolio'));
    //     await setDoc(docRef,{
    //         title:form
    //     });
  
    //     clearInput(e);
    // }
    const {addTitle} = props;

    const titleTextInput = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        const titleText = titleTextInput.current.value;
        const text ={
            title:titleText
        }
        addTitle(text);
        clearInput();
        return;
    }

    const clearInput =() =>{
        titleTextInput.current.value='';
    }





    return (
        <>
            <div className={styles.container}>
                <span className={styles.title}>Create an Album</span>
                <div className={styles.form}>
                    <form onSubmit={submitHandler}>
                        <input type="text" placeholder="Album Name" 
                        ref={titleTextInput}required />
                        <button className={styles.clearButton} onClick={clearInput}>Clear</button>
                        <button className={styles.createButton} type='submit'>Create</button>
                    </form>
                </div>
            </div>
        </>
    )
}
