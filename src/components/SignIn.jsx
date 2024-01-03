import './SignIn.css'
import Input from './UI/Input'
import { useState } from 'react'

export default function SignIn({ handleSignIn}){

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    
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
            <p>Please sign in to continue</p>
            <div className="dialog-inputs">
                <Input label="Email:" id="email" type="email" onChange={getEmail}/>
                <Input label="Password:" id="password" type="password" onChange={getPassword}/>
            </div>
            <div className="action-btns">
                <button onClick={handleLogIn} >Sign In</button>
                <button>Sign Up</button>
            </div>
        </div> 
        </div>
        )
        
        
    
};