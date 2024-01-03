import './App.css';
import Header from './components/Header';
import SignIn from './components/SignIn';
import { useState } from 'react';



function App() {

  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  function handleSignIn(){
    setIsUserSignedIn(true);
  }

  return (
    <div className="App">
      <Header/>
      {!isUserSignedIn && <SignIn handleSignIn={handleSignIn}/>}
      
    </div>
  );
}

export default App;
