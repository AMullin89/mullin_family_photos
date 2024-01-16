import Modal from "./UI/Modal"
import DialogHeader from "./UI/DialogHeader"
import Input from "./UI/Input"

export default function SignUp({toggleSignIn, open}){
    return (
        <Modal className="dialog" open={open}>
            <DialogHeader>Welcome!</DialogHeader>
            <p>Please sign up to continue</p>
            <div className="dialog-inputs">
                <Input label="First Name:" id="first-name" type="text"/>
                <Input label="Last Name:" id="last-name" type="text"/>
                <Input label="Email:" id="sign-up-email" type="email" />
                <Input label="Password:" id="password" type="password" />
                <Input label="Confirm Password" id="confirm-password" type="password"/>
            </div>
            <div className="action-btns">
                <button>Sign Up</button>
                <button onClick={toggleSignIn}>Sign In</button>
            </div>
        </Modal>
    )
}