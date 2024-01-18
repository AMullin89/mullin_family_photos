import Post from './Post'
import './UsersTab.css'
import './PostsView.css'
import { useState, useEffect, useContext } from 'react'
import CreatePost from './CreatePost'
import axios from 'axios'
import { APIContext } from '../store/api-context'
import { useSocket } from '../store/socket-context'


export default function PostsView(){

    const apiCtx = useContext(APIContext)

    const [showCreatePost, setShowCreatePost] = useState(false)
    const [posts, setPosts] = useState([])
    const [replies, setReplies] = useState([])

    const socket = useSocket();

    async function getPosts(){
        const posts = await axios.get(apiCtx + '/posts')
        console.log(posts)
        setPosts(posts.data);
    }

    async function getReplies(){
        const replies = await axios.get(apiCtx + '/replies');
        console.log(replies.data);
        setReplies(replies.data);

    }

    useEffect(() => {
        getPosts();
        getReplies();
        console.log(replies);
        socket.on('update_posts', () => {
            getReplies();
            getPosts();
        })
    }, [socket])
    
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
            {posts.map((post) => <Post replies={replies.filter((reply) => reply.post_id === post.id)} getPosts={getPosts} key={post.id} post={post}/>)}
            <CreatePost open={showCreatePost} handleCloseCreatePost={handleCloseCreatePost} getPosts={getPosts}/>
        </div>
    )
}