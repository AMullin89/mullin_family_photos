import ImageCard from "./UI/ImageCard"
import './ImageView.css'

export default function ImageView({imagesData, fetchImages, handleShowUpload}){

    return (
        
        <div id="image-container">
            <header id="photos-header">
                <h3>Photos</h3>
                <i onClick={handleShowUpload} class="fi fi-br-plus"></i>
            </header>
            <div id="images">
                {imagesData.map((image) => <ImageCard fetchImages={fetchImages} image={image}/>)}
            </div>
        </div>
    )
}