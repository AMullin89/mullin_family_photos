import Modal from "./Modal";
import Message from "./Message";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { APIContext } from "../../store/api-context";
import { UsersContext } from "../../store/users-context";
import { UserContext } from "../../store/user-context";
import './MessageContainer.css'



export default function MessageContainer({open, handleCloseMessages}){

    const [messages, setMessages] = useState([])
    const [selectedMessage, setSelectedMessage] = useState()
    const [newMessage, setNewMessage] = useState(false)
    const apiCtx = useContext(APIContext);
    const usersCtx = useContext(UsersContext);
    const userCtx = useContext(UserContext)



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
    }, [])

    function handleSelectMessage(message){
        setSelectedMessage(message);
    }

    function showNewMessage(){
        setNewMessage(true);
    }

    function hideNewMessage(){
        setNewMessage(false);
    }

    return (
        <Modal className="dialog img-upload-dialog" open={open} id="img-upload-dialog">
            <header className="dialog-header">
                {!newMessage ? <h2>Messages</h2> : <h2>New Message</h2>}
            </header>

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
                <button onClick={handleCloseMessages}>Close</button>
            </div>
            </>}
            {newMessage && 
            <div id="new-message">
                <select>
                    {usersCtx.map(user => <option key={user.id} value={user.first_name + ' ' + user.last_name}>{user.first_name + ' ' + user.last_name}</option>)}
                </select>
                <textarea rows="10"></textarea>
                <div className="action-btns">
                    <button>Send</button>
                    <button onClick={hideNewMessage}>Back</button>
                </div>

            </div>}
            
        </Modal> 
    )
}