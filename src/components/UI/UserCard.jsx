import './UserCard.css'

export default function UserCard({user}){
    return (
        <div className="user-card">
            <div className="img-placeholder"></div>
            <div className="user-details">
                <h4>{user.first_name} {user.last_name}</h4>
                {user.is_online ? <p>Online</p> : <p>Offline</p>}
            </div>
        </div> 
    )
}