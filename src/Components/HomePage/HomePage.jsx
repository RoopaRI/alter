import React from 'react';
import './HomePage.css';

export default function HomePage(){
    const username = localStorage.getItem('username');
    const profilePic = localStorage.getItem('profilePic');

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return(
        <div className='home'>
            <div className='userInfo'>
                {profilePic && <img src={profilePic} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />}
                <p>{username}</p>
            </div>
           
            <button className='button' onClick={handleLogout}>Logout</button>
        </div>
    )
}
