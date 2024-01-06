import UserCard from "./UI/UserCard";
import './UsersTab.css'

export default function UsersTab({users}){
    console.log(users);
    return (
        <div id="users-container">
            <h3>Users</h3>
            {users.map((user) => <li key={user.id}><UserCard user={user}/></li>)}
        </div>
    )
}