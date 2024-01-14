import { useContext } from "react"
import { UserContext } from "../store/user-context"

export default function ActivityCard({activity}){

    const userCtx = useContext(UserContext)

    return <p>{userCtx.id !== activity.user_id ? activity.first_name : "You"} {activity.activity}</p>
}