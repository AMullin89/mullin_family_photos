import Input from "./UI/Input"
import { useState } from "react";
import './ImageUpload.css'
import axios from 'axios';
import { useContext } from "react";
import { UserContext } from "../store/user-context";

export default function ImageUpload(){

    const userCTX = useContext(UserContext);

    const [file, setFile] = useState();
    const [imgPreview, setImgPreview] = useState();
    const [imageTitle, setImageTitle] = useState()

    function getUploadedFile(event){
        setFile(event.target.files[0]);
        setImgPreview(URL.createObjectURL(event.target.files[0]))
    }

    function handleImageUpload(event){  
        event.preventDefault();      
        console.log(userCTX)
        const formData = new FormData();
        formData.append('my-image-file', file, file.name);
        formData.append('name', userCTX.first_name);
        formData.append('title', imageTitle);
        axios.post('http://localhost:3001/upload', formData)
        .then(res => {
            console.log('Axios response: ', res)
        })      
    }

    function getImageTitle(event){
        setImageTitle(event.target.value)
    }

    return(
        <div>
            <div className="dialog">
            <header className="dialog-header">
                <h2>Upload Image</h2>
            </header>
            <p>Please select your image and give it a title!</p>
            <div id="img-preview-container">
                { file ? <img id="image-preview" alt="Preview" src={imgPreview}/> : <p>No file to preview</p>}
            </div>
            <div className="dialog-inputs">
                <Input type="file" onChange={getUploadedFile}/>
                <Input label="Title:" id="title" type="text" onChange={getImageTitle} />
            </div>
            <div className="action-btns">
                <button onClick={handleImageUpload}>Upload</button>
                <button>Cancel</button>
            </div>
        </div> 
        </div>
    )
}