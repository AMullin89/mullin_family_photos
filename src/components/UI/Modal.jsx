import { useRef, useEffect } from "react"

export default function Modal({ children, open, className = '', id = ''}){
    const dialog = useRef()

    useEffect(() => {
        const modal = dialog.current;

        if(open) {
            modal.showModal()
        }

        return () => modal.close();
    }, [open])

    return (
        <dialog ref={dialog} className={className} id={id}>
            {children}
        </dialog>
    );
}