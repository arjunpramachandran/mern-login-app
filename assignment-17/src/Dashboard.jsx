import React from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'



const Dashboard = () => {
  const userName = localStorage.getItem('userName')
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('userName')
    navigate('/')
  }
  return (
    
    <div>
      <div className=' row-col-6 p-1 border' >
        <div className='display-5'>
          Dashboard
        </div>
        <div className='text-end'>
          <button type='button' className='btn btn-white ml-2' onClick={handleLogout}> Logout</button>
        </div>
      </div>
      <div className="row-col-6 display-6 text-center" style={{height:"100vh"}}>
      "Welcome {userName}, you are logged in!"
        </div>
    </div>
  )
}

export default Dashboard