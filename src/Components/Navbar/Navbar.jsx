import React from 'react';
import './Navbar.css';

export default function Navbar(){
    const username = localStorage.getItem('username');
    const profilePic = localStorage.getItem('profilePic');

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return(
        <div className='navbar'>
            <div className='userInfo'>
                {profilePic && <img src={profilePic} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />}
                <h4>{username}</h4>
            </div>
           
            <button className='button' onClick={handleLogout}>Logout</button>
        </div>
    )
}
