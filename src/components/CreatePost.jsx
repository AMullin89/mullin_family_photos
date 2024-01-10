import Modal from "./UI/Modal";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../store/user-context";
import getDateTime from "./Util/timeDateUtil";
import { APIContext } from "../store/api-context";

export default function CreatePost({open, handleCloseCreatePost, getPosts}){

    const [post, setPost] = useState('');
    const userCTX = useContext(UserContext);
    const apiCTX = useContext(APIContext);

    


    async function handleClick(){
       
        const dateTime = getDateTime();

        const formData = new FormData();
        formData.append('user_id', userCTX.id);
        formData.append('post', post);
        formData.append('date', dateTime);

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        await axios.post(apiCTX + '/newpost', formData, options)
                   .then(res => {
                        console.log("Axios response:", res)
                    })
                    .then(getPosts())
                    .then(handleCloseCreatePost());
    
    }
    function getUserPost(event){
        setPost(event.target.value);
    }
    return (
        <Modal className="dialog img-upload-dialog" open={open}>
            <header className="dialog-header">
                <h2>Create New Post</h2>
            </header>
            <p>What's on your mind?</p>

            <div className="dialog-inputs">
                <textarea onChange={getUserPost} rows="5" maxLength="255"></textarea>
            </div>
            <div className="action-btns">
                <button onClick={handleClick}>Post</button>
                <button onClick={handleCloseCreatePost}>Cancel</button>
            </div>
        </Modal>
    )
}