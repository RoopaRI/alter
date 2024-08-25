import React, { useState } from 'react';
import './CommentBox.css';

export default function CommentBox() {
    const [comment, setComment] = useState('');
    const [attachments, setAttachments] = useState([]);
    const maxCharacters = 250;

    const handleInputChange = (e) => {
        if (e.target.value.length <= maxCharacters) {
            setComment(e.target.value);
        }
    };

    const handleBold = () => {
        setComment(comment + '**bold**');
    };

    const handleItalic = () => {
        setComment(comment + '_italic_');
    };

    const handleUnderline = () => {
        setComment(comment + '<u>underline</u>');
    };

    const handleLink = () => {
        const url = prompt("Enter the URL");
        setComment(comment + `[Link](${url})`);
    };

    const handleSubmit = () => {
        console.log("Comment:", comment);
        console.log("Attachments:", attachments);

        setComment('');
        setAttachments([]);
    };

    return (
        <div className='comment-section'>
            <div className="comment-box">
                <textarea
                    className='input'
                    value={comment}
                    onChange={handleInputChange}
                    placeholder="Write a comment..."
                />
                <hr className='divider'/>
                <div className='control-section'>
                    <div className="controls"> 
                        <button className='bold-btn' onClick={handleBold}>B</button>
                        <button className='italic-btn' onClick={handleItalic}>I</button>
                        <button className='underline-btn' onClick={handleUnderline}>U</button>
                        <button className='link-btn' onClick={handleLink}><i class="fas fa-link"></i></button>
                    </div>
                    <button className='submit-btn' onClick={handleSubmit}>Send</button>
                </div>   
            </div>
        </div>
    );
}
