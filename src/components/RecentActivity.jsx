import { useContext, useEffect, useState } from 'react'
import ActivityCard from './ActivityCard'
import axios from 'axios';
import './RecentActivity.css'
import { APIContext } from '../store/api-context';
import { io } from 'socket.io-client';
const socket = io.connect("http://localhost:3001")

export default function RecentActivity(){

    const [activities, setActivities] = useState([]);
    const apiCtx = useContext(APIContext);


    useEffect(() => {
        async function getActivities(){
            try {
                const result = await axios.get(apiCtx + '/activities')
                setActivities(result.data);
                console.log(activities);
            
            } catch (error) {
                console.error('Failed to get images', error);
            }
        }

        getActivities();

        socket.on('update_activity', ()=> {
            getActivities();
        })
    }, [socket])

    return (
        <div id="recent-activity-container">
            <h3>Recent Activity</h3>
            {activities.map((activity) => <ActivityCard activity={activity} />)}
        </div>
    )
}