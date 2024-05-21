import React, { useEffect, useState } from 'react'
import Intro from './Components/1 Intro/Intro'
import Logo from './Assets/logo.png'
import { Navigate, Route,Routes } from 'react-router-dom'
import SignUp from './Components/2 Auth/SignUp'
import { useNavigate } from 'react-router-dom'
import LogIn from './Components/2 Auth/LogIn'
import { useRecoilState } from 'recoil'
import { LoginState} from './HandleData/atoms'
import MainApp from './Components/3 MainApp/MainApp'
import ImageContext from '../src/HandleData/ImageContext'


function App() {

  const navigation =useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [logo]=useState(Logo)


  useEffect(() => {
   
    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!user); 
  }, []);
 


  return (
    <ImageContext.Provider value={logo}>
<div className='bg-black h-screen w-screen text-white'>
        <Routes>
          <Route path='/' element={ <Intro Logoimg={Logo}></Intro>}></Route>
          <Route path='/signup' element={<SignUp Logoimg={Logo}></SignUp>}></Route>
          <Route path='/login' element={!isLoggedIn &&  <LogIn Logoimg={Logo}></LogIn>}></Route>
          <Route path='/mainApp/*' element={isLoggedIn && <MainApp Logoimg={Logo}></MainApp>}></Route>
        </Routes>
    </div>  
    </ImageContext.Provider>
      
    
  )
}

export default App
