import './App.css';
import Header from './components/Header';
import SignIn from './components/SignIn';
import { useState, useEffect } from 'react';
import UsersTab from './components/UsersTab';
import ImageView from './components/ImageView';
import ImageUpload from './components/ImageUpload';
import PostsView from './components/PostsView';
import { UserContext } from './store/user-context';
import { APIContext } from './store/api-context';
import axios from 'axios';




function App() {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [imagesData, setImagesData] = useState([]);
  const [showUpload, setShowUpload] = useState(false)
  const [apiUrl, setApiUrl] = useState('http://localhost:3001');

  async function fetchImages(){

    try {
      const response = await axios.get(apiUrl + '/images');
      setImagesData(response.data);
      console.log(imagesData);
    } catch (error) {
      console.error('Failed to get images', error);
    }
  }

  async function fetchUsers(){
    try {
      const response = await axios.get(apiUrl + '/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to get users', error)
    }      
  }

  useEffect(() => {
    fetchUsers();
    fetchImages();
  }, [isUserSignedIn]);

  function handleShowUpload(){
    setShowUpload(true);
  }

  function handleCloseUpload(){
    setShowUpload(false);
  }

  async function handleSignIn(email, password){

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const options = {
            headers: {
                'Content-Type': 'application/json',
            }
    };

    try {
      const response = await axios.post(apiUrl + '/signin', formData, options);
      setUser(response.data);
      setIsUserSignedIn(true);
    } catch (error) {
      console.error('Login error:', error);
    }

    
  };

  function handleSignOut(){
    setIsUserSignedIn(false);
    setUser({});
  }

  return (
    
    <APIContext.Provider value={apiUrl}>
      <UserContext.Provider value={user}>
      <div className="App">
        <Header isUserSignedIn={isUserSignedIn} handleShowUpload={handleShowUpload} handleSignOut={handleSignOut}/>
        {!isUserSignedIn && <SignIn handleSignIn={handleSignIn}/>}
        {isUserSignedIn && 
        <div>
        <h3 id="welcome-message">Welcome, {user.first_name}</h3>
        <div id="user-interface">
          <UsersTab users={users}/>
          <ImageView imagesData={imagesData} fetchImages={fetchImages} handleShowUpload={handleShowUpload}/>
          <PostsView/>
        </div>
        <ImageUpload open={showUpload} handleCloseUpload={handleCloseUpload} fetchImages={fetchImages}/>
        <img src="../../images/test.JPG"/>
      </div>
      }
    </div>
    </UserContext.Provider>
    </APIContext.Provider>

  );
}

export default App;
