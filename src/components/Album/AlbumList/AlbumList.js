import {useState } from 'react';
import { Album } from '../Album/Album';
import { AlbumForm } from '../AlbumForm/AlbumForm';
import styles from './albumList.module.css';

export const AlbumList = (props) => {
    const [showForm, setShowForm] = useState(false);
    const {title,setTitle} = props;    

    function toggleForm(e) {
        e.preventDefault();
        setShowForm(!showForm);
    }
    return (
        <>
            <div className={styles.header}>
                <h1>Your Albums</h1>
                {(showForm)?<AlbumForm title={title} setTitle={setTitle}/>:null}
                <a className={styles.btn} id={showForm?(styles.clearAlbum):(styles.addAlbum)} href='/' onClick={toggleForm}>{showForm?'Cancel':'Add Album'}</a>
            </div>
            <div className={styles.grid}>
            {
                title.map((single,i)=>{
                    return(
                    <Album title={single} key={i}
                    />
                    );
                })
            }
            </div>
        </>
    )

}