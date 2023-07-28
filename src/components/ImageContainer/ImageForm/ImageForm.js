import styles from './ImageForm.module.css';
export const ImageForm = () => {
    return (
        <>
            <div className={styles.container}>
                <span className={styles.title}>Add image to Album </span>
                    <form className={styles.form}>
                        <input type="text" placeholder="Title"
                             required />
                             <input type="text" placeholder='Image URL' required />

                             <div className={styles.formActions}>
                             <button id={styles.clearButton} className={styles.btn}>Clear</button>

                        <button id={styles.addButton}  className={styles.btn}>Add</button>

                             </div>

                    </form>

            </div>
        </>
    )
}