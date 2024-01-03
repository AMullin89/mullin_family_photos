import './SignIn.css'
import Input from './UI/Input'
import { useState, useEffect } from 'react'

export default function SignIn({ handleSignIn}){

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);

    function handleSignIn(){
        let obj = users.find(o => o.email === userEmail);

        if (!obj){
            console.log("User not found")
            return;
        }

        if (obj.password === userPassword) {
            setIsUserSignedIn(true);
        }else{
            console.log("Incorrect log in details")
        }
        
    }

    useEffect(() => {
        async function fetchUsers(){
            const response = await fetch('http://localhost:3001/users');

            if(!response.ok){
                console.log("Failed to fetch data");
            }

            const users = await response.json();
            setUsers(users);
        }
        fetchUsers();
    }, []);




    function getEmail(event){
        setUserEmail(event.target.value);
    }

    function getPassword(event){
        setUserPassword(event.target.value);
    }

    

    return (
        <div>
            {!isUserSignedIn && <div className="dialog">
            <header className="dialog-header">
                <h2>Welcome!</h2>
            </header>
            <p>Please sign in to continue</p>
            <div className="dialog-inputs">
                <Input label="Email:" id="email" type="email" onChange={getEmail}/>
                <Input label="Password:" id="password" type="password" onChange={getPassword}/>
            </div>
            <div className="action-btns">
                <button onClick={handleSignIn} >Sign In</button>
                <button>Sign Up</button>
            </div>
        </div> }
        </div>
    )
        
        
    
};