import React, {useState, useEffect} from 'react';
import {auth, provider} from './config';
import {signInWithPopup} from 'firebase/auth';
import Main from './Main';

export default function SignIn(){
    const [value, setValue] = useState('');

    const handleClick = () => {   
        signInWithPopup(auth, provider).then((data)=>{
            setValue(data.user.email);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("username", data.user.displayName);
            localStorage.setItem("profilePic", data.user.photoURL);
        })
    }

    useEffect(()=>{
        setValue(localStorage.getItem('email'));
    })

    return(
        <div>
            {value?<Main/>:
            <button onClick={handleClick}>SignIn with Google</button>}
        </div>
    )
}
