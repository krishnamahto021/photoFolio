import { Album } from '../Album/Album';
import { AlbumForm } from '../AlbumForm/AlbumForm';
import styles from './albumList.module.css';
import { useState } from 'react';


export const AlbumList = (props) => {
    const [showForm, setShowForm] = useState(false);   
    const {addTitle,titles} = props; 
    

    function toggleForm(e) {
        e.preventDefault();
        setShowForm(!showForm);
    }
    
    return (
        <>
            <div className={styles.header}>
                <h1>Your Albums</h1>
                {(showForm)?<AlbumForm titles={titles} addTitle={addTitle}/>:null}
                <a className={styles.btn} id={showForm?(styles.clearAlbum):(styles.addAlbum)} href='/' onClick={toggleForm}>{showForm?'Cancel':'Add Album'}</a>
            </div>
            <div className={styles.grid}>
            {
                titles.map((single,i)=>{
                    return(
                    <Album title={single.title} key={i}
                    />
                    );
                })
            }
            </div>
        </>
    )

}