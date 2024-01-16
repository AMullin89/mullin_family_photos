import RecentActivity from "./RecentActivity";
import UsersTab from "./UsersTab";
import ImageView from "./ImageView";
import PostsView from "./PostsView";
import ImageUpload from "./ImageUpload";
import { useState, useEffect, useContext } from "react";
import { useSocket } from "../store/socket-context";
import axios from "axios";
import { APIContext } from "../store/api-context";
import { UsersContext } from "../store/users-context";
import MessageContainer from "./UI/MessageContainer";



export default function Home({user, setUsers, isUserSignedIn, handleShowUpload, showUpload, showMessages, handleCloseMessages, handleCloseUpload}){

    const [imagesData, setImagesData] = useState([]);
    const [likedImages, setLikedImages] = useState([]);

    const apiCtx = useContext(APIContext);
    const usersCtx = useContext(UsersContext);
    const socket = useSocket();

      async function fetchImages(){

    try {
      const response = await axios.get(apiCtx + '/images');
      setImagesData(response.data);
      console.log(imagesData);
    } catch (error) {
      console.error('Failed to get images', error);
    }
  }

  async function fetchUsers(){
    try {
      const response = await axios.get(apiCtx + '/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to get users', error)
    }      
  }

    useEffect(() => {
        fetchUsers();
        fetchImages();
  }, [isUserSignedIn]);

    useEffect(() => {
        socket.on('update_images', ()=> {
            fetchImages();
        })
    }, [socket])

    useEffect(() => {
            socket.on('update_users', (user)=> {
            fetchUsers();
        })
  }, [socket])

    return (
        <div>
        <h3 id="welcome-message">Welcome, {user.first_name}</h3>
        <div id="user-interface">
          <div id="activity-users-container">
            <RecentActivity/>
            <UsersTab users={usersCtx}/>
          </div>
          <ImageView imagesData={imagesData} fetchImages={fetchImages} handleShowUpload={handleShowUpload}/>
          <PostsView/>
        </div>
        <ImageUpload open={showUpload} handleCloseUpload={handleCloseUpload} fetchImages={fetchImages}/>
        <MessageContainer open={showMessages} handleCloseMessages={handleCloseMessages}/>
      </div>
    )
}