import Modal from "./Modal";
import Message from "./Message";
import axios from "axios";
import { useState, useContext, useEffect, useRef } from "react";
import { APIContext } from "../../store/api-context";
import { UsersContext } from "../../store/users-context";
import { UserContext } from "../../store/user-context";
import { MessagesContext } from "../../store/messages-context";
import { useSocket } from "../../store/socket-context";
import getDateTime from "../Util/timeDateUtil";
import './MessageContainer.css'
import Input from "./Input";
import DialogHeader from "./DialogHeader";



export default function MessageContainer({open, handleCloseMessages}){

    
    const [selectedMessage, setSelectedMessage] = useState();
    const [newMessage, setNewMessage] = useState(false);
    const [receiver, setReceiver] = useState(1);
    const [message, setMessage] = useState();
    const [messageTitle, setMessageTitle] = useState();
    const [unreadMessages, setUnreadMessages] = useState([]);

    const [messages, setMessages] = useState([]);
    

    const titleInput = useRef();
    const textarea = useRef();
    const socket = useSocket();

    const apiCtx = useContext(APIContext);
    const usersCtx = useContext(UsersContext);
    const userCtx = useContext(UserContext);
    const messagesCtx = useContext(MessagesContext);


    useEffect(() => {
    async function getMessages(){
        try {
            const response = await axios.get(apiCtx + '/messages');
            setMessages(response.data);
            
        } catch (error) {
            console.error('Failed to get images', error);
        }
    }
        getMessages()
        socket.on('update_messages', () => {
            getMessages()
        })
    }, [socket])

        useEffect(() => {
        function getUnreadMessages(){
            setUnreadMessages(messages.filter((message) => message.unread === '1'));
        }

        if(messages){
        getUnreadMessages()
        console.log(unreadMessages);
        }
    }, [messages])

    async function handleSelectMessage(message){
        setSelectedMessage(message);

        if(message.unread){
            const formData = new FormData();
            formData.append('message_id', message.id);
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            await axios.post(apiCtx + '/read_message', formData, options)

            socket.emit('read_message');
        }

        
    }

    function showNewMessage(){
        setNewMessage(true);
    }

    function hideNewMessage(){
        setNewMessage(false);
    }

    function closeMessages(){
        setSelectedMessage();
        handleCloseMessages();
    }

    async function sendMessage(){
        
        const dateTime = getDateTime();
        const formData = new FormData();

        formData.append('receiver', receiver);
        formData.append('title', messageTitle);
        formData.append('message', message);
        formData.append('sender', userCtx.id);
        formData.append('sent', dateTime)
        titleInput.current.value = '';
        textarea.current.value = '';
        setMessage();
        hideNewMessage();

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        await axios.post(apiCtx + '/message', formData, options)
        .then(res => {
            console.log("Axios response:", res)
        });

        socket.emit('new_message');

    }

    function getReceiver(event){
        setReceiver(event.target.value);
    }

    function getMessage(event){
        setMessage(event.target.value);
    }

    function getMessageTitle(event){
        setMessageTitle(event.target.value)
    }

    return (
        <Modal className="dialog img-upload-dialog" open={open} id="img-upload-dialog">
            <DialogHeader>{!newMessage ? <h2>Messages</h2> : <h2>New Message</h2>}</DialogHeader>
            {!newMessage && 
            <>
            <div id="message-view">
                <div id="messages-list">
                    {messages.filter((message) => message.receiver === userCtx.id).map((message) => <Message handleSelectMessage={handleSelectMessage} id={message.id} message={message}/>)}
                </div>
                {selectedMessage && 
                    <div id="message">
                        <h3>From {selectedMessage.sender_first_name}</h3>
                        <p>{selectedMessage.message}</p>
                    </div>}
            </div>
            <div className="action-btns">
                <button onClick={showNewMessage}>New Message</button>
                <button onClick={closeMessages}>Close</button>
            </div>
            </>}
            {newMessage && 
            <div id="new-message">
                <label htmlFor="to">To:</label>
                <select id="to" onChange={getReceiver}>
                    {usersCtx.map(user => <option key={user.id} value={user.id}>{user.first_name + ' ' + user.last_name}</option>)}
                </select>
                <Input ref={titleInput} label="Title" type="text" id="title" onChange={getMessageTitle} />
                <label htmlFor="message">Message</label>
                <textarea ref={textarea} id="new-message-text" onChange={getMessage} rows="10"></textarea>
                <div className="action-btns">
                    <button onClick={sendMessage}>Send</button>
                    <button onClick={hideNewMessage}>Back</button>
                </div>

            </div>}
            
        </Modal> 
    )
}