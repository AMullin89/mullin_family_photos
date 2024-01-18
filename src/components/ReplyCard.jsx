import './ReplyCard.css'
import { UserContext } from '../store/user-context'
import { useContext } from 'react'
import axios from 'axios';
import { APIContext } from '../store/api-context';
import { useSocket } from '../store/socket-context';

export default function ReplyCard({reply}){

    const userCtx = useContext(UserContext);
    const apiCtx = useContext(APIContext);
    const socket = useSocket();

    async function deleteReply(){

        const formData = new FormData();
        formData.append('id', reply.id);

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        await axios.post(apiCtx + '/delete_reply', formData, options)
        socket.emit('new-reply');

    }

    return(
        <div className="reply-card-container">
            <div>
                <h4 className="author">{reply.first_name}</h4>
                <p className="reply"> {reply.reply}</p>
                <div className="reply-actions">
                    {userCtx.id === reply.user_id && <i class="fi fi-rs-trash" onClick={deleteReply}></i>}
                    <p className="date-time">{reply.date}</p>
                </div>
                
            </div>
            
        </div>
    )
}