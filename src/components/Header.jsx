import './Header.css';
import { UserContext } from '../store/user-context';
import { MessagesContext } from '../store/messages-context';
import { useContext } from 'react';


export default function Header({unreadMessages, isUserSignedIn, handleShowUpload, handleSignOut, handleShowMessages}){

    const messagesCtx = useContext(MessagesContext);
    const userCtx = useContext(UserContext);


    return (
        <header id="header-main">
            <h1 id="title-main">Mullin Family Photos</h1>
            {isUserSignedIn &&
            <div>
                <div>
                    <ul id="nav">
                        <li onClick={handleShowUpload}>Upload</li>
                        <div id="messages-nav">
                            <li onClick={handleShowMessages}>Messages</li>
                            <div id="unread-count"><p>{messagesCtx.filter((message) => message.unread == '1' && message.receiver_id === userCtx.id).length}</p></div>
                        </div>
                        <li onClick={handleSignOut}>Sign Out</li>
                    </ul>
                </div>
            </div>}
        </header>
    )
};