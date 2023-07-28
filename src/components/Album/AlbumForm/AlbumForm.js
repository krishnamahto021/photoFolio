import { useRef} from 'react';
import styles from './albumForm.module.css';



export const AlbumForm = (props) => {
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
