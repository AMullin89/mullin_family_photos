import './ImageCard.css'

export default function ImageCard({image}){
    return (
        <div className="image-container">
            <h4>{image.title}</h4>
            <img src={image.file_path} alt={image.title}/>
            <p>Uploaded by {image.first_name}</p>
            <div className="img-actions">
                <i class="fi fi-ts-comment-alt-dots"></i>
                <i class="fi fi-rs-heart"></i>
                <i class="fi fi-rr-star"></i>
            </div>
        </div>
    )
}