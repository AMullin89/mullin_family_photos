import './Dialog.css'

export default function DialogHeader({children, close}){
    return( 
        <header className="dialog-header">
            <h2>{children}</h2>
            <i class="fi fi-br-cross" onClick={close}></i>
        </header>
    )
}