import React from 'react'
import {useNavigate} from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    function handleClick() {
        navigate('./Login.js')
    }
  return (
    <div>
      <h1 onClick={handleClick}>Welcome to admin panel</h1>
    </div>
  )
}

export default Home
