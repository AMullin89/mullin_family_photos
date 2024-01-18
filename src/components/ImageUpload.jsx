import Input from "./UI/Input"
import { useState, useContext, useRef } from "react";
import './SignIn.css'
import './ImageUpload.css'
import Modal from "./UI/Modal";
import axios from 'axios';
import { UserContext } from "../store/user-context";
import { APIContext } from "../store/api-context";
import { useSocket } from "../store/socket-context";
import DialogHeader from "./UI/DialogHeader";


export default function ImageUpload({open, handleCloseUpload, fetchImages}){

    const userCTX = useContext(UserContext);
    const apiCTX = useContext(APIContext);
    const fileUpload = useRef();
    const socket = useSocket();

    const [file, setFile] = useState();
    const [imgPreview, setImgPreview] = useState();
    const [imageTitle, setImageTitle] = useState()

    function getUploadedFile(event){
        setFile(event.target.files[0]);
        setImgPreview(URL.createObjectURL(event.target.files[0]))
    }

    async function handleImageUpload(event){  
        event.preventDefault();      
        console.log(userCTX)
        const formData = new FormData();
        formData.append('my-image-file', file, file.name);
        formData.append('id', userCTX.id);
        formData.append('title', imageTitle);
        await axios.post(apiCTX + '/upload', formData)
        .then(res => {
            console.log('Axios response: ', res)
        })   
        
        socket.emit('new_image');
        closeUpload();
    }

    function getImageTitle(event){
        setImageTitle(event.target.value)
    }

    function closeUpload(){
        handleCloseUpload()
        setImgPreview();
        fileUpload.current.value = '';
    }


    return(
        <Modal className="dialog img-upload-dialog" open={open} id="img-upload-dialog">
            <DialogHeader close={closeUpload}>Upload a new photo!</DialogHeader>
            <p>Please select your image and give it a title!</p>
            <div id="img-preview-container">
                { imgPreview ? <img id="image-preview" alt="Preview" src={imgPreview}/> : <p>No file to preview</p>}
            </div>
            <div className="dialog-inputs">
                <input ref={fileUpload}  type="file" onChange={getUploadedFile}/>
                <Input label="Title:" id="title" type="text" onChange={getImageTitle} />
            </div>
            <div className="action-btns">
                <button onClick={handleImageUpload}>Upload</button>
                <button onClick={closeUpload}>Cancel</button>
            </div>
        </Modal> 
    )
}