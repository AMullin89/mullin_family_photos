import ImageCard from "./UI/ImageCard"
import './ImageView.css'

export default function ImageView({imagesData, fetchImages}){

    return (
        
        <div id="image-container">
            <div>
                <h3>Photos</h3>
            </div>
            <div id="images">
                {imagesData.map((image) => <ImageCard fetchImages={fetchImages} image={image}/>)}
            </div>
        </div>
    )
}