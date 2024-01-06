import './ImageCard.css'
import Comment from '../Comment'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function ImageCard({image}){

    const [commentOpen, setCommentOpen] = useState(false);
    const [comments, setComments] = useState([])

    async function getComments(){
            const response = await axios.get('http://localhost:3001/comments')
            const comments = response.data.filter(o => o.image_id === image.id);
            setComments(comments)
    }
    
    useEffect(() => {
        getComments();
        }
        
    , [])

    function openCommentDialog(){
        setCommentOpen(true);
    }

    function closeCommentDialog(){
        setCommentOpen(false);
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
                <i class="fi fi-rs-heart"></i>
                <i class="fi fi-rr-star"></i>
            </div>
        <Comment image={image} open={commentOpen} closeCommentDialog={closeCommentDialog} comments={comments} getComments={getComments} />
        </div>
    )
}