import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logoutMe = (e) => {
    localStorage.removeItem('currentUser')
    navigate('/login')
  }
  return (
    <div className='navbar'>
      <div className="title">BOOK STORE  CRUD  OPERATION using Redux </div>
      <div className="logout" onClick={logoutMe}>Logout</div>

    </div>
  )
}

export default Navbar