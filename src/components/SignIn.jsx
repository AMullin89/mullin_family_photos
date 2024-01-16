import './SignIn.css'
import DialogHeader from './UI/DialogHeader';
import Input from './UI/Input'
import { useState } from 'react'
import Modal from './UI/Modal';


export default function SignIn({ handleSignIn, open, toggleSignIn}){

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
        <Modal className="dialog" open={open}>
                <DialogHeader>Welcome!</DialogHeader>
            <p>Please sign in to continue</p>
            <div className="dialog-inputs">
                <Input label="Email:" id="sign-in-email" type="email" onChange={getEmail}/>
                <Input label="Password:" id="password" type="password" onChange={getPassword}/>
            </div>
            <div className="action-btns">
                <button onClick={handleLogIn} >Sign In</button>
                <button onClick={toggleSignIn}>Sign Up</button>
            </div>
        </Modal>
    ) 
};