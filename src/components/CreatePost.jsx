import Modal from "./UI/Modal";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../store/user-context";
import getDateTime from "./Util/timeDateUtil";
import { APIContext } from "../store/api-context";
import { useSocket } from "../store/socket-context";
import DialogHeader from "./UI/DialogHeader";


export default function CreatePost({open, handleCloseCreatePost, getPosts}){

    const [post, setPost] = useState('');
    const userCTX = useContext(UserContext);
    const apiCTX = useContext(APIContext);

    const socket = useSocket();

    


    async function handleClick(){
       
        const dateTime = getDateTime();

        const formData = new FormData();
        formData.append('user_id', userCTX.id);
        formData.append('post', post);
        formData.append('date', dateTime);
        formData.append('activity', 'created a post.')

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        socket.emit("new_activity", formData)

        await axios.post(apiCTX + '/activity', formData, options);

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
            <DialogHeader>Create a new post!</DialogHeader>
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