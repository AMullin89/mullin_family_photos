import './CommentCard.css';
import axios from 'axios';
import { useRef, useContext } from 'react';
import { UserContext } from '../../store/user-context';
import { APIContext } from '../../store/api-context';

export default function CommentCard({comment}){

    const commentCard = useRef();
    const userCTX = useContext(UserContext);
    const apiCtx = useContext(APIContext);

    async function deleteComment(){

        const formData = new FormData();
        formData.append('comment_id', comment.id);
        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        axios.post(apiCtx + '/delete', formData, options)
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
                <p className="date-time">{comment.date}</p>
            </div>
            {userCTX.id === comment.user_id && <i onClick={deleteComment} class="fi fi-rs-trash"></i>}
        </div>

    )
}