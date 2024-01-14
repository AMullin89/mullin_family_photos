import UserCard from "./UI/UserCard";
import './UsersTab.css'

export default function UsersTab({users}){
    return (
        <div id="users-container">
            <header>
                <h3>Users</h3>
            </header>
            {users.map((user) => <li key={user.id}><UserCard user={user}/></li>)}
        </div>
    )
}