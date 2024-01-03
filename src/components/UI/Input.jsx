export default function Input({ label, id, ...props}){
    return(
        <>
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} required {...props}/>
        </>

    )
}