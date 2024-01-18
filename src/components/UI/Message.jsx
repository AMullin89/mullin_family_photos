import { useEffect } from 'react'
import './Message.css'

export default function Message({message, handleSelectMessage}){

    if (!message){
        return console.log("no messages")
    }

    return (
        <div className="message-card" onClick={() => handleSelectMessage(message)}>
            {message.unread === 1 && <p className="new-marker">New!</p>}
            <div  >
            <h3>{message.sender_first_name}</h3>
            <p className="date-time">{message.sent}</p>
            <p>{message.title}</p>
        </div>
        </div>
        
    )
}