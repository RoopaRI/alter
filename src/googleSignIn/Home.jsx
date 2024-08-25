import React from 'react';

export default function Home(){

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return(
        <div>
           <h1>Home page</h1>
           <button onClick={handleLogout}>Logout</button>
        </div>
    )
}