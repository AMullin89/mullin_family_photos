import Post from './Post'
import './UsersTab.css'
import './PostsView.css'
import { useState, useEffect } from 'react'
import CreatePost from './CreatePost'
import axios from 'axios'


export default function PostsView(){

    const [showCreatePost, setShowCreatePost] = useState(false)
    const [posts, setPosts] = useState([])

    async function getPosts(){
        const posts = await axios.get('http://localhost:3001/posts')
        console.log(posts)
        setPosts(posts.data);
    }

    useEffect(() => {
        getPosts()


    }, [])
    
    function handleShowCreatePost(){
        setShowCreatePost(true)
    }

    function handleCloseCreatePost(){
        setShowCreatePost(false)
    }

    return (
        <div id="posts-container">
            <header id="posts-header">
                <h3>Posts</h3>
                <i onClick={handleShowCreatePost} class="fi fi-br-plus"></i>
            </header>
            {posts.map((post) => <Post getPosts={getPosts} key={post.id} post={post}/>)}
            <CreatePost open={showCreatePost} handleCloseCreatePost={handleCloseCreatePost} getPosts={getPosts}/>
        </div>
    )
}