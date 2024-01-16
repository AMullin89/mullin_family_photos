import Modal from "./UI/Modal";
import './ImageUpload.css'
import './Comment.css'
import { useContext, useState, useRef } from "react";
import { UserContext } from "../store/user-context";
import axios from "axios";
import CommentCard from "./UI/CommentCard";
import { APIContext } from "../store/api-context";
import DialogHeader from "./UI/DialogHeader";

export default function Comment({open, image, closeCommentDialog, comments, getComments}){

    const [input, setInput] = useState('');
    const textArea = useRef();
    const userCtx = useContext(UserContext);
    const apiCtx = useContext(APIContext);

    function handleInputChange(event){
        setInput(event.target.value)
    }

    async function handleSubmit(){

        const formData = new FormData()
        formData.append('comment', input);
        formData.append('image_id', image.id);
        formData.append('user_id', userCtx.id);
        textArea.current.value = '';
        setInput('');

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        await axios.post(apiCtx + '/comment', formData, options)
        .then(res => {
            console.log("Axios response:", res)
        })
        .then(getComments());
    }

    return (
        <Modal className="dialog img-upload-dialog" id="comment-dialog" open={open}>
            <DialogHeader>Comment on this photo!</DialogHeader>
            <div id="img-comment">
                <img src={image.file_path}/>
            </div>
            <div id="comments">
                <h3>Comments</h3>
               {comments ? comments.map((comment) => <CommentCard key={comment.id} comment={comment}/>) : <p>Be the first to comment!</p>}
            </div>
            <div className="dialog-inputs">
                <textarea ref={textArea} maxLength="255" rows="5" onChange={handleInputChange}></textarea>
            </div>
            <p>{255 - input.length}</p>
            <div className="action-btns">
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={closeCommentDialog}>Cancel</button>
            </div>
        </Modal>
    )
}