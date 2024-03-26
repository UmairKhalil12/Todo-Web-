import './App.css';
import Navbar from './Component/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Component/Signup/Signup';
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebase';






function App() {
  const [user , setUser] = useState(false);
  const [userInfo , setUserInfo] = useState(); 

  useEffect(()=>{
    onAuthStateChanged(auth , (user)=>{
      if(user){
        setUser(true)
        setUserInfo(user)
      }
      else{
        setUser(false)
      }
    } , [user])
  
  })

  return (
    <>
      <BrowserRouter>
        <Navbar user = {user}  />
        {console.log(user)}
        <Routes>
          {user ? <Route path="/" element={<Home user={userInfo} />} /> : <Route path="/" element={<Login />}  />}
          { user ? <Route path="/Home" element={<Home user={userInfo} />} /> :  <Route path="/Login" element={<Login />}  />}
          {user ? <Route path="/" element={<Home user={userInfo} />} /> : <Route path="/Login" element={<Login/>} />}
          {user ? <Route path="/" element={<Home user={userInfo}  />} /> : <Route path="/Signup" element={<Signup user={user} userInfo={userInfo} />} /> }
        </Routes>
      </BrowserRouter>
    </>


  );
}

export default App;
