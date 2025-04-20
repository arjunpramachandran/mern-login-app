
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://mern-login-app-it58.onrender.com/login', {
        email,
        password,
      })
      if(response.data.user){
        localStorage.setItem('userName', response.data.user.name)
        navigate('/dashboard')
      }
      
      // if (response.data.token) {
      //   localStorage.setItem('token', response.data.token)
      //   navigate('/dashboard')
      // }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    }
  }

  return (
    <div>
      <h1 className='display-5  text-center mt-5'>Login</h1>
      <div className="container px-4 py-5 mx-auto">
        <div className="card card0 rounded">
          <div className="d-flex flex-lg-row flex-column-reverse ">
            <div className="card card1 ">
              <div className="row justify-content-center my-auto ">
                <div className="col-md-8 col-10 my-5 ">

                  <h3 className="mb-5 text-center heading">We are ShopOnline</h3>

                  <h6 className="msg-info">Please login to your account</h6>

                  <div className="form-group">
                    <label className="form-control-label text-muted">Username</label>
                    <input type="email" id="email" name="email" placeholder="Type Your Email ID" className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-control-label text-muted">Password</label>
                    <input type="password" id="psw" name="password" placeholder="Password" className="form-control" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                  </div>

                  <div className="row justify-content-center my-3 px-3">
                    <button  className="btn-block btn-color" onClick={handleLogin}>Login</button>
                  </div>

                  <div className="row justify-content-center my-2">
                    <a href="#"><small className="text-muted">Forgot Password?</small></a>
                  </div>
                  {error && <p style={{color: 'red'}}>{error}</p>}
                </div>
              </div>
              <div className="bottom text-center mb-5">
                <p href="#" className="sm-text mx-auto mb-3">Don't have an account?<button onClick={()=>navigate('/signup')} className="btn btn-white ml-2">Create new</button></p>
              </div>
            </div>
            <div className="card card2">
              <div className="my-auto mx-md-5 px-md-5 right">
                <h3 className="text-white">We are more than just a company</h3>
                <small className="text-white">ShopOnline is your all-in-one marketplace to buy and sell with ease. Whether you're shopping for the latest trends or launching your own store, we make it simple, secure, and seamless. Join a growing community where great deals meet great opportunities — only at ShopOnline.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login