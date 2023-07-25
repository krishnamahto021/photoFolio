import { useState } from 'react';
import styles from './albumForm.module.css'
export const AlbumForm = () => {
    const [title, setTitle] = useState('');
    function clearInput(e) {
        e.preventDefault();
        setTitle('');
    }

    function handleChange(e) {
        setTitle(e.target.value);
    }

    function submitHandler(e){
        e.preventDefault();
        setTitle(e.target.value);
        console.log(title);
    }

    return (
        <>
            <div className={styles.container}>
                <span className={styles.title}>Create an Album</span>
                <div className={styles.form}>
                    <form onSubmit={submitHandler}>
                        <input type="text" placeholder="Album Name" value={title} onChange={handleChange} required />
                        <button className={styles.clearButton}  onClick={clearInput}>Clear</button>
                        <button className={styles.createButton} type='submit'>Create</button>
                    </form>
                </div>

            </div>
        </>
    )

}