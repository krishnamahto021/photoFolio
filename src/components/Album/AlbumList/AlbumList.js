import { useState } from 'react';
import { Album } from '../Album/Album';
import { AlbumForm } from '../AlbumForm/AlbumForm';
import styles from './albumList.module.css';
export const AlbumList = () => {
    const [showForm, setShowForm] = useState(false);

    function toggleForm(e) {
        e.preventDefault();
        setShowForm(!showForm);
    }
    return (
        <>
            <div className={styles.header}>
                <h1>Your Albums</h1>
                {(showForm)?<AlbumForm/>:null}
                <a className={styles.btn} id={showForm?(styles.clearAlbum):(styles.addAlbum)} href='/' onClick={toggleForm}>{showForm?'Cancel':'Add Album'}</a>
            </div>
            <div className={styles.grid}>
            <Album/>
            <Album/>
            <Album/>
            <Album/>
            <Album/>
            <Album/>
            <Album/>
            <Album/>
            <Album/>
            <Album/>
            <Album/>
            </div>
        </>
    )

}