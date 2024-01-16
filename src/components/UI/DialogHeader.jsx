import './Dialog.css'

export default function DialogHeader({children}){
    return( 
        <header className="dialog-header">
            <h2>{children}</h2>
        </header>
    )
}