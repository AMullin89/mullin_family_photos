import './CommentCard.css';
import axios from 'axios';
import { useRef } from 'react';

export default function CommentCard({comment}){

    const commentCard = useRef();

        async function deleteComment(){

        const formData = new FormData();
        formData.append('comment_id', comment.id);
        console.log(comment);
        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        axios.post('http://localhost:3001/delete', formData, options)
             .then(res => {
                    console.log("Axios response:", res);
                })

        commentCard.current.style.display = 'none';
        }
    

    return (
        <div className="comment-card-container" ref={commentCard}>
            <div>
                <h4 className="author">{comment.first_name}</h4>
                <p className="comment">{comment.comment}</p>
            </div>
            <i onClick={deleteComment} class="fi fi-rs-trash"></i>
        </div>

    )
}