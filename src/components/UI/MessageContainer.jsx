import Modal from "./Modal";
import Message from "./Message";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { APIContext } from "../../store/api-context";



export default function MessageContainer({open, handleCloseMessages}){

    const [messages, setMessages] = useState([])
    const apiCtx = useContext(APIContext);



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


    return (
        <Modal className="dialog img-upload-dialog" open={open} id="img-upload-dialog">
            <header className="dialog-header">
                <h2>Messages</h2>
            </header>
            {messages.map((message) => <Message id={message.id} message={message}/>)}
            <div className="action-btns">
                <button >New Message</button>
                <button onClick={handleCloseMessages}>Close</button>
            </div>
        </Modal> 
    )
}