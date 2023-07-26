import { useState } from 'react';
import styles from './albumForm.module.css';

export const AlbumForm = (props) => {
    const { title, setTitle } = props;
    const [form, setForm] = useState('');

    function clearInput(e) {
        e.preventDefault();
        setForm('');
    }

    function handleChange(e) {
        setForm(e.target.value);
    }

    async function submitHandler(e) {
        e.preventDefault();

        // Update the title state in the parent component
        setTitle([form,...title]);


        clearInput(e);
    }

    return (
        <>
            <div className={styles.container}>
                <span className={styles.title}>Create an Album</span>
                <div className={styles.form}>
                    <form onSubmit={submitHandler}>
                        <input type="text" placeholder="Album Name" value={form} onChange={handleChange} required />
                        <button className={styles.clearButton} onClick={clearInput}>Clear</button>
                        <button className={styles.createButton} type='submit'>Create</button>
                    </form>
                </div>
            </div>
        </>
    )
}
