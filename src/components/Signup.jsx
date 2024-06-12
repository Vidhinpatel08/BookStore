import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Signup = () => {
    const [user, setUser] = useState({ name: '', email: '', password: '' })
    const changeMe = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const PasswordValidation = (password) => {
        let passwordValid = {
            upperCase: false,
            LowerCase: false,
            digit: false,
        }
        password.split('').filter(value => {
            if (value.charCodeAt() >= 65 && value.charCodeAt() <= 90) {
                passwordValid.upperCase = true
            }
            if (value.charCodeAt() >= 97 && value.charCodeAt() <= 122) {
                passwordValid.LowerCase = true
            }
            if (value.charCodeAt() >= 48 && value.charCodeAt() <= 57) {
                passwordValid.digit = true
            }
        })


        if (passwordValid.upperCase === true && passwordValid.LowerCase === true && passwordValid.digit === true) {
            return 'valid'
        } else {
            return 'notValid'
        }
    }

    const handleSubmit = (e) => {
        console.log('I am Here')
        let userName = user.name
        let userEmail = user.email
        let userPassword = user.password
        if (userName === '' || userEmail === '' || userPassword === '') {
            console.log('I am function')
            return alert("field should not be empty")
        }
    
        if (userName.length < 3 || userPassword.length < 5) {
            return alert('please enter vaild field')
        }
        if (!/^(?!\.)[\w+]+(?:[.%_+][\w+]+)*@[\w+]+\.[A-Za-z]{2,}/g.test(userEmail)) {
            return alert('please enter vaild Email')
        }
        else if (PasswordValidation(user.password) === 'notValid') {
            return alert("Password Not valid")
        }
        else {
            let listOfUsers = JSON.parse(localStorage.getItem('users')) || []
            listOfUsers.push(user)
            console.log(listOfUsers)
            localStorage.setItem("users", JSON.stringify(listOfUsers))
            alert('Register Successfully')
        }
        setUser([{ name: '', email: '', password: '' }])
    }

    return (
        <>
            <div className="signup-container">
                <h1 className='signup-title'>BOOK STORE - Signup</h1>

                <div className="container">
                    <div className="input-grp">
                        <span>
                            <div className="labal">Name : </div>
                            <input type="text" name='name' value={user.name} placeholder='Name' onChange={changeMe} required />
                        </span>
                        <span>
                            <div className="labal">Email : </div>
                            <input type="email" name='email' value={user.email} placeholder='Email' onChange={changeMe} required />
                        </span>
                        <span>
                            <div className="labal">Password : </div>
                            <input type="text" name='password' value={user.password} placeholder='Password' onChange={changeMe} required />
                        </span>
                    </div>
                    <div className="btns">
                        <button type="submit" onClick={handleSubmit}>Signup</button>
                        <button type="button"><NavLink to='/login'>Login</NavLink></button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Signup
