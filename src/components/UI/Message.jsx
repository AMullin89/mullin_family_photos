import './Message.css'

export default function Message({message, handleSelectMessage}){
    return (
        <div className="message-card " onClick={() => handleSelectMessage(message)}>
            <h3>{message.sender_first_name}</h3>
            <p className="date-time">10th Jan 24 @ 10:00</p>
            <p>{message.title}</p>
        </div>
    )
}