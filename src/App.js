import './App.css';
import Header from './components/Header';
import SignIn from './components/SignIn';
import { useState, useEffect } from 'react';
import UsersTab from './components/UsersTab';
import ImageView from './components/ImageView';
import ImageUpload from './components/ImageUpload';
import { UserContext } from './store/user-context';



function App() {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [imagesData, setImagesData] = useState([]);
  const [showUpload, setShowUpload] = useState(false)

  useEffect(() => {
    async function fetchUsers(){
      const response = await fetch('http://localhost:3001/users');

      if(!response.ok){
        console.log("Failed to fetch data");
      }

      const users = await response.json();
      setUsers(users);
    }
    fetchUsers();

    async function fetchImages(){
      const response = await fetch('http://localhost:3001/images');

      if(!response.ok){
        console.log("Failed to fetch data");
      }

      const imagesData = await response.json();
      setImagesData(imagesData);

    }
    fetchImages();
  }, []);

  function handleShowUpload(){
    setShowUpload(true);
  }

  function handleCloseUpload(){
    setShowUpload(false);
    console.log("Clicked Cancel")
  }

  function handleSignIn(email, password){
    let obj = users.find(o => o.email === email);

    if (!obj){
      console.log("User not found")
      return;
    }

    if (obj.password === password) {
      setIsUserSignedIn(true);
      setUser(obj);
    }else{
      console.log("Incorrect log in details")
    }
  };

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Header isUserSignedIn={isUserSignedIn} handleShowUpload={handleShowUpload}/>
        {!isUserSignedIn && <SignIn handleSignIn={handleSignIn}/>}
        {isUserSignedIn && 
        <div>
        <h3>Welcome, {user.first_name}</h3>
        <div id="user-interface">
          <UsersTab users={users}/>
          <ImageView imagesData={imagesData}/>
        </div>
        <ImageUpload open={showUpload} handleCloseUpload={handleCloseUpload}/>
        <img src="../../images/test.JPG"/>
      </div>
      }
    </div>
    </UserContext.Provider>

  );
}

export default App;
