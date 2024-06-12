import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState([])
    const changeMe = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        if (!user.email || !user.password) {
            alert("field should not be empty")
        }
        else {
            console.log('Check Functionality')
            let listOfusers = JSON.parse(localStorage.getItem('users'))
            console.log('List', listOfusers)
            console.log('user', user)

            listOfusers.filter((users) => {
                if (users.email === user.email && users.password === user.password) {
                        console.log('Valid User')
                        localStorage.setItem('currentUser', JSON.stringify(user))
                        navigate("/");
                        return ''
                }
                else {
                    return console.log('Not match email or password')
                }
            })

            setUser([{ email: '', password: '' }])
        }
    }
    return (
        <>
            <div className="signup-container">
                <h1 className='signup-title'>BOOK STORE - Login</h1>

                <div className="container">
                    <div className="input-grp">
                        <span>
                            <div className="labal">Email : </div>
                            <input type="text" name='email' value={user.email} placeholder='Email' onChange={changeMe} required />
                        </span>
                        <span>
                            <div className="labal">Password : </div>
                            <input type="text" name='password' value={user.password} placeholder='Password' onChange={changeMe} required />
                        </span>
                    </div>
                    <div className="btns">
                        <button type="submit"><NavLink to='/signup'> Signup</NavLink></button>
                        <button type="submit" onClick={handleSubmit}>Login</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login