import { useRef } from 'react';
import styles from './ImageForm.module.css';
export const ImageForm = (props) => {
    const {addImageToAlbum} = props;
    const titleTextInput = useRef();
    const urlInput = useRef();

    const clearInput = ()=>{
        titleTextInput.current.value='';
        urlInput.current.value = '';
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        const titleText = titleTextInput.current.value;
        const imageUrl = urlInput.current.value;
        const data = {
            title:titleText,
            url:imageUrl
        }
        addImageToAlbum(data);
        clearInput();
        return;
    }
    return (
        <>
            <div className={styles.container}>
                <span className={styles.title}>Add image to Album </span>
                    <form className={styles.form} onSubmit={submitHandler}>
                        <input type="text" placeholder="Title"
                             required ref={titleTextInput} />
                             <input type="text" placeholder='Image URL' ref={urlInput} required />

                             <div className={styles.formActions}>
                             <button id={styles.clearButton} className={styles.btn} onClick={clearInput}>Clear</button>

                        <button id={styles.addButton}  className={styles.btn}>Add</button>

                             </div>

                    </form>

            </div>
        </>
    )
}