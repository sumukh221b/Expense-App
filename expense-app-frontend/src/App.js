import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import './App.css'

const App = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const handleAuth = () => {
    setUserLoggedIn(!userLoggedIn)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      handleAuth()
    }
  }, [])

  return (
    <div className="container-fluid App">
      <div className="row bg-image" style={{ backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/841/212/863/abstract-pattern-gradient-wallpaper-preview.jpg')`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '150vh', width: '100vw' }} >
        <div className="col-md-12">
          <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth} />
        </div>
      </div>
    </div>
  )
}

export default App