import Post from './Post'
import './UsersTab.css'
import './PostsView.css'

export default function PostsView({}){
    return (
        <div id="posts-container">
            <h3>Posts</h3>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    )
}