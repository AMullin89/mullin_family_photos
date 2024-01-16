import './App.css';
import Header from './components/Header';
import SignIn from './components/SignIn';
import Home from './components/Home';
import { useState } from 'react';
import { UserContext } from './store/user-context';
import { APIContext } from './store/api-context';
import { UsersContext } from './store/users-context';
import { useSocket } from './store/socket-context';
import axios from 'axios';
import SignUp from './components/SignUp';



function App() {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  
  const [showUpload, setShowUpload] = useState(false)
  const [apiUrl, setApiUrl] = useState('http://localhost:3001');
  const [showMessages, setShowMessages] = useState(false)
  const [signInScreen, setSignInScreen] = useState(true);

  const socket = useSocket();

  function toggleSignIn(){
    setSignInScreen(!signInScreen);
    }

  function handleShowUpload(){
    setShowUpload(true);
  }

  function handleShowMessages(){
    setShowMessages(true);
  }
  
  function handleCloseMessages(){
    setShowMessages(false);
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
      setUser(response.data)
      setIsUserSignedIn(true);
      socket.emit("sign_in");
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  async function handleSignOut(){
    
    const formData = new FormData();
    formData.append('user_id', user.id )

    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    try {
      await axios.post(apiUrl + '/signout', formData, options);
      setIsUserSignedIn(false);
      setUser({});
      socket.emit('sign_in', user)
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
          <UsersContext.Provider value={users}>
    <APIContext.Provider value={apiUrl}>
      <UserContext.Provider value={user}>
      <div className="App">
        <Header isUserSignedIn={isUserSignedIn} handleShowUpload={handleShowUpload} handleShowMessages={handleShowMessages} handleSignOut={handleSignOut}/>
        <SignIn handleSignIn={handleSignIn} open={signInScreen &&!isUserSignedIn} toggleSignIn={toggleSignIn} />
        <SignUp open={!signInScreen && !isUserSignedIn} toggleSignIn={toggleSignIn}/>
        {isUserSignedIn && <Home user={user} setUsers={setUsers} handleShowUpload={handleShowUpload} showUpload={showUpload} showMessages={showMessages} handleCloseUpload={handleCloseUpload} handleCloseMessages={handleCloseMessages} />}
    </div>
    </UserContext.Provider>
    </APIContext.Provider>
    </UsersContext.Provider>
  );
}

export default App;
