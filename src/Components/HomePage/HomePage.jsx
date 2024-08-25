import React from 'react';
import './HomePage.css';
import Navbar from '../Navbar/Navbar';
import CommentBox from '../CommentBox/CommentBox';

export default function HomePage(){

    return(
        <div>
            <Navbar/>
            <CommentBox/>
        </div>
    )
}
