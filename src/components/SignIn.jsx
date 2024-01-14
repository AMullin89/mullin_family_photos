import './SignIn.css'
import Input from './UI/Input'
import { useState } from 'react'
import { io } from 'socket.io-client';
const socket = io.connect("http://localhost:3001")

export default function SignIn({ handleSignIn}){

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [signInScreen, setSignInScreen] = useState(true);

    function toggleSignIn(){
        setSignInScreen(!signInScreen);
    }
    
    function getEmail(event){
        setUserEmail(event.target.value);
    }

    function getPassword(event){
        setUserPassword(event.target.value);
    }

    function handleLogIn(){
        handleSignIn(userEmail, userPassword);

    }

    return (
        <div>
            <div className="dialog">
            <header className="dialog-header">
                <h2>Welcome!</h2>
            </header>
            {signInScreen ? <p>Please sign in to continue</p> : <p>Please sign up to continue</p>}
            <div className="dialog-inputs">
                {!signInScreen && <Input label="First Name:" id="first-name" type="text"/>}
                {!signInScreen && <Input label="Last Name:" id="last-name" type="text"/>}
                <Input label="Email:" id="email" type="email" onChange={getEmail}/>
                <Input label="Password:" id="password" type="password" onChange={getPassword}/>
                {!signInScreen && <Input label="Confirm Password" id="confirm-password" type="password"/>}
            </div>
            {signInScreen && <div className="action-btns">
                <button onClick={handleLogIn} >Sign In</button>
                <button onClick={toggleSignIn}>Sign Up</button>
            </div>}
            {!signInScreen && <div className="action-btns">
                <button>Sign Up</button>
                <button onClick={toggleSignIn}>Sign In</button>
            </div>}

        </div> 
        </div>
        )
        
        
    
};