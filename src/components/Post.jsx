import './Post.css'
import { UserContext } from '../store/user-context'
import { APIContext } from '../store/api-context';
import { useContext } from 'react'
import axios from 'axios';


export default function Post({post, getPosts}){

    const userCTX = useContext(UserContext);
    const apiCTX = useContext(APIContext);

    async function deletePost(){
        const formData = new FormData();
        formData.append('post_id', post.id);
        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
            
        }
        await axios.post(apiCTX + '/deletepost', formData, options)
                    .then(res => {
                    console.log("Axios response:", res);
                    })
        getPosts();
    }

    

    return (
        <div className="post-container">
            <h3>{post.first_name} {post.last_name}</h3>
            <p className="post-date">{post.date}</p>
            <p>{post.post}</p>
            <div className="post-actions">
                <i class="fi fi-ts-comment-alt-dots" ></i>
                <i class="fi fi-rs-heart"></i>
                <i class="fi fi-rr-star"></i>
                {userCTX.id === post.user_id && <i onClick={deletePost} class="fi fi-rs-trash"></i>}
            </div>
        </div>
        
    )
}