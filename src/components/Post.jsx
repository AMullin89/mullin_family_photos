import './Post.css'

export default function Post(){
    return (
        <div className="post-container">
            <h3>Ashley Mullin</h3>
            <p>6th Jan 2024</p>
            <p>This is a dummy message from me to myself. It is designed to test the layout of the posts view!</p>
            <div>
                <i class="fi fi-ts-comment-alt-dots" ></i>
                <i class="fi fi-rs-heart"></i>
                <i class="fi fi-rr-star"></i>
            </div>
        </div>
        
    )
}