import React, {useState, useEffect} from 'react';
import {auth, provider} from './config';
import {signInWithPopup} from 'firebase/auth';
import Home from './Home';

export default function SignIn(){
    const [value, setValue] = useState('');

    const handleClick = () => {   
        signInWithPopup(auth, provider).then((data)=>{
            setValue(data.user.email);
            localStorage.setItem("email", data.user.email)

        })
    }

    useEffect(()=>{
        setValue(localStorage.getItem('email'));
    })

    return(
        <div>
            {value?<Home/>:
            <button onClick={handleClick}>SignIn with Google</button>}
        </div>
    )
}
