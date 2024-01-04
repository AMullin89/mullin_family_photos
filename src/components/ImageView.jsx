import ImageCard from "./UI/ImageCard"
import './ImageView.css'

export default function ImageView({imagesData}){
    return (
        <div id="image-container">
            {imagesData.map((image) => <ImageCard image={image}/>)}
        </div>
    )
}