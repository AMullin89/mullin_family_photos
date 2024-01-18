import './Post.css'
import { UserContext } from '../store/user-context'
import { APIContext } from '../store/api-context';
import { useContext, useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import Input from './UI/Input';
import getDateTime from './Util/timeDateUtil';
import ReplyCard from './ReplyCard';
import { useSocket } from '../store/socket-context';


export default function Post({post, replies, getPosts}){

    const [replyOpen, setReplyOpen] = useState(false);
    const [reply, setReply] = useState('');
    const [showReplies, setShowReplies] = useState(false)
    const [liked, setLiked] = useState();

    const userCTX = useContext(UserContext);
    const apiCTX = useContext(APIContext);

    const socket = useSocket();

    useEffect(() => {
        console.log(replies);
    }, [replies])

        useEffect(() => {
        function checkIfLikedByUser(){
            if(post.liker_id === userCTX.id && post.liked_post === post.id){
                setLiked(true);
            }
        }
       
        checkIfLikedByUser()
    }, [post])

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

    function showReply(){
        setReplyOpen(!replyOpen)
    }

    function getReply(event){
        setReply(event.target.value);
    }

    function handleShowReplies(){
        setShowReplies(!showReplies);
    }

    async function handleClickLiked(){
                const formData = new FormData();
        formData.append('post_id', post.id)
        formData.append('user_id', userCTX.id)

            
        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        if(!liked){
            formData.append('liked', true)
            await axios.post(apiCTX + '/liked_post', formData, options)
            setLiked(true);

            formData.append('activity', 'liked a post');
            await axios.post(apiCTX + '/activity', formData, options);
        }else{
            formData.append('liked', false)
            await axios.post(apiCTX + '/liked_post', formData, options)
            setLiked(false);
        }

        socket.emit('liked_post');
        socket.emit('new_activity');
        

        
    }

    async function sendReply(){
        

        const dateTime = getDateTime()
        const formData = new FormData();
        formData.append('user_id', userCTX.id);
        formData.append('post_id', post.id);
        formData.append('reply', reply);
        formData.append('date', dateTime);

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        await axios.post(apiCTX + '/reply', formData, options)

        socket.emit('new-reply');
        setReply('')
        setReplyOpen(false);
    }

    

    return (
        <div className="post-container">
            <h3>{post.first_name} {post.last_name}</h3>
            <p className="post-date">{post.date}</p>
            <p className="post-content">{post.post}</p>
            <p className="post-likes">{post.likes} likes!</p>
            <div className="replies-actions-flex">
                {replies.length > 0 ? <p className="reply-status" onClick={handleShowReplies}> View {replies.length} replies</p> : <p className="reply-status" onClick={showReply}>Be the first to reply</p> }
                <div className="post-actions">
                <i class="fi fi-ts-comment-alt-dots" onClick={showReply} ></i>
                {liked ? <i onClick={handleClickLiked} class="fi fi-ss-heart liked"></i> : <i onClick={handleClickLiked} class="fi fi-rs-heart"></i>}
                {userCTX.id === post.user_id && <i onClick={deletePost} class="fi fi-rs-trash"></i>}
            </div>
            </div>
            
            {showReplies && <div className="replies-container">
                {replies.map((reply) => <ReplyCard reply={reply} />)}
            </div>}
            {replyOpen && <div className="reply-form">
                        <Input onChange={getReply} value={reply} type="text" id="reply" placeholder="reply"/> 
                        <i class="fi fi-ts-address-card" onClick={sendReply}></i>
                        </div>}
        </div>
        
    )
}