import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [error, setError] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match')
                return
            }
            if (password.length < 6) {
                setError('Password must be at least 6 characters long')
                return
            }
            const isValidEmail = /\S+@\S+\.\S+/.test(email);
            if (!isValidEmail) {
                return setError('Please enter a valid email address');
            }
            if(!/^\d{10}$/.test(phoneNumber)) {
                return setError('Please enter a valid phone number');
            }
            await axios.post('https://mern-login-app-it58.onrender.com/signup', {
                name,
                email,
                password,
                phoneNumber,
                dateOfBirth,
            })
            navigate('/')
        } catch (error) {
            setError(error.response?.data?.message || 'Signup failed')
        }
    }
    return (
        <div>
            <h1 className='display-5  text-center mt-5'>Sign Up</h1>
            <div className="container px-4 py-5 mx-auto">
                <div className="card card0 rounded">
                    <div className="d-flex flex-lg-row flex-column-reverse ">
                        <div className="card card1 ">
                            <div className="row justify-content-center my-auto ">
                                <div className="col-md-8 col-10 my-5 ">

                                    <h3 className="mb-5 text-center heading">We are ShopOnline</h3>


                                    <div className="form-group">
                                        <label className="form-control-label text-muted">Username</label>
                                        <input type="text" id="name" name="name" placeholder="Type Your Name" className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label text-muted">Email</label>
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
                                    <div className="form-group">
                                        <label className="form-control-label text-muted">Confirm Password</label>
                                        <input type="password" id="cnfpsw" name="confirmPassword" placeholder="Confirm Password" className="form-control"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label text-muted">Phone Number</label>
                                        <input type='number' id="phone" name="phoneNumber" placeholder="Phone Number" className="form-control"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label text-muted">Select Date Of Birth</label>
                                        <input type='date' id="date" name='dateOfBirth' className="form-control"
                                            value={dateOfBirth}
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                            
                                        />
                                    </div>

                                    <div className="row justify-content-center my-3 px-3">
                                        <button className="btn-block btn-color" onClick={handleSignUp}>Sign Up</button>
                                    </div>


                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                </div>
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

export default SignUp