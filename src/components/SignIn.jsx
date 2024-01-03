import './SignIn.css'

export default function SignIn({ handleSignIn}){
    return (
        <div class="dialog">
            <header class="dialog-header">
                <h2>Welcome!</h2>
            </header>
            <p>Please sign in to continue</p>
            <div className="dialog-inputs">
                <label for="email">Email:</label>
                <input id="email" name="email" type="email" required />
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" required/>
            </div>
            <div className="action-btns">
                <button onClick={handleSignIn}>Sign In</button>
                <button>Sign Up</button>
            </div>
        </div>
    )
};