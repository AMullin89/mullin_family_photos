import './ImageCard.css'
import Comment from '../Comment'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { UserContext } from '../../store/user-context';
import { APIContext } from '../../store/api-context';


export default function ImageCard({image, fetchImages}){

    const [commentOpen, setCommentOpen] = useState(false);
    const [comments, setComments] = useState([])
    const [favourite, setFavourite] = useState(false);
    const [liked, setLiked] = useState(false);

    const userCTX = useContext(UserContext);
    const apiCtx = useContext(APIContext)

    async function getComments(){
            const response = await axios.get(apiCtx + '/comments')
            const comments = response.data.filter(o => o.image_id === image.id);
            setComments(comments)
    }
    
    useEffect(() => {
        getComments();
        }
        
    , [])

    function handleClickFavourite(){
        setFavourite(!favourite);
    }

    function handleClickLiked(){
        setLiked(!liked);
    }

    function openCommentDialog(){
        setCommentOpen(true);
    }

    function closeCommentDialog(){
        setCommentOpen(false);
    }

    async function deleteImage(){
        const formData = new FormData();
        formData.append('image_id', image.id);
        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        await axios.post(apiCtx + '/deleteimage', formData, options)
                   .then(res => {
                    console.log("Axios response:", res);
                    })
        getComments();
        fetchImages();
    }


    return (
        <div className="image-container">
            <h4>{image.title}</h4>
            <div>
                <img src={image.file_path} alt={image.title}/>
                <p>Uploaded by {image.first_name}</p>
            </div>
            <div className="img-actions">
                <i class="fi fi-ts-comment-alt-dots" onClick={openCommentDialog}></i>
                {liked ? <i onClick={handleClickLiked} class="fi fi-ss-heart liked"></i> : <i onClick={handleClickLiked} class="fi fi-rs-heart"></i>}
                {favourite ? <i onClick={handleClickFavourite}  class="fi fi-sr-star favourited"></i> : <i onClick={handleClickFavourite} class="fi fi-rr-star"></i> }
                {userCTX.id === image.user_id && <i onClick={deleteImage} class="fi fi-rs-trash"></i>}
            </div>
        <Comment image={image} open={commentOpen} closeCommentDialog={closeCommentDialog} comments={comments} getComments={getComments} />
        </div>
    )
}