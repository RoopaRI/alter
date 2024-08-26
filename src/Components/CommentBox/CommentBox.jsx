import React, { useState, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import './CommentBox.css';
import 'quill/dist/quill.snow.css';

export default function CommentBox() {
    const [comments, setComments] = useState([]);
    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: {
                container: [
                    [{ 'bold': true }, { 'italic': true }, { 'underline': true }],
                    ['image'], // Image button
                    ['customSend'] // Placeholder for custom button
                ]
            }
        },
        placeholder: 'Write a comment...'
    });

    // Define the submit handler
    const handleSubmit = () => {
        if (quill) {
            const newComment = quill.root.innerHTML; // Get comment from Quill editor
            const username = localStorage.getItem('username'); // Fetch user details from localStorage
            const profilePic = localStorage.getItem('profilePic'); // Fetch user details from localStorage

            if (newComment.trim() && username) { // Only add non-empty comments
                setComments(prevComments => [
                    ...prevComments,
                    {
                        text: newComment,
                        profilePicture: profilePic,
                        name: username,
                        reactions: {
                            like: 0,
                            love: 3,
                            haha: 0
                        }
                    }
                ]); // Update state with the new comment
                quill.setText(''); // Clear the editor
            }
        }
    };

    // Define the image upload handler
    const handleImageUpload = () => {
        if (!quill) return;

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const range = quill.getSelection();
                    if (range) { 
                        quill.insertEmbed(range.index, 'image', reader.result);
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    const handleReaction = (index, reactionType) => {
        setComments(prevComments => {
            const newComments = [...prevComments];
            newComments[index].reactions[reactionType] += 1;
            return newComments;
        });
    };

    useEffect(() => {
        if (quill) {
            const toolbar = quill.getModule('toolbar');
            toolbar.addHandler('image', handleImageUpload);

            // Add custom send button with className
            const customButton = document.createElement('button');
            customButton.innerHTML = 'Send';
            customButton.className = 'ql-custom-send'; // Apply custom styles
            customButton.onclick = handleSubmit;
            toolbar.container.appendChild(customButton);

            console.log("Quill initialized with toolbar handlers");
        }
    }, [quill]);

    return (
        <div className='comment-section'>
            <div className="comment-box">
                <div ref={quillRef} />
            </div>
            <div className="comments-list">
                {comments.length > 0 ? comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <div className="comment-header">
                            <img src={comment.profilePicture} alt={`${comment.name}'s profile`} className="profile-picture" />
                            <span className="commenter-name">{comment.name}</span>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: comment.text }} /> {/* Render comment */}
                        <div className="reactions">
                            <button className="reaction-button" onClick={() => handleReaction(index, 'like')}>
                                👍 {comment.reactions.like}
                            </button>
                            <button className="reaction-button" onClick={() => handleReaction(index, 'love')}>
                                ❤️ {comment.reactions.love}
                            </button>
                            <button className="reaction-button" onClick={() => handleReaction(index, 'haha')}>
                                😂 {comment.reactions.haha}
                            </button>
                        </div>
                    </div>
                )) : <p>No comments yet.</p>}
            </div>
        </div>
    );
}
