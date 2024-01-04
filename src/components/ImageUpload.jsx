import Input from "./UI/Input"
import { useState } from "react";
import './ImageUpload.css'
import axios from 'axios';

export default function ImageUpload(){

    const [file, setFile] = useState();
    const [imgPreview, setImgPreview] = useState();

    function getUploadedFile(event){
        setFile(event.target.files[0]);
        setImgPreview(URL.createObjectURL(event.target.files[0]))
    }

    function handleImageUpload(){        
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:3001/upload', formData, {
            headers: {
                'Content-Type': formData.type
            }
        })
        .then(res => {})
        .catch(err => console.log(err))
        
        
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
                <Input label="Title:" id="title" type="text" />
            </div>
            <div className="action-btns">
                <button onClick={handleImageUpload}>Upload</button>
                <button>Cancel</button>
            </div>
        </div> 
        </div>
    )
}