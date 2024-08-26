import React, { useState } from 'react';
import CommentEditor from '../CommentEditor/CommentEditor';
import CommentList from '../CommentList/CommentList';
import './CommentBox.css';

export default function CommentBox() {
    const [comments, setComments] = useState([]);

    // Define the submit handler for new comments
    const handleSubmit = () => {
        const quill = document.querySelector('.comment-box .ql-editor');
        if (quill) {
            const newComment = quill.innerHTML;
            const username = localStorage.getItem('username');
            const profilePic = localStorage.getItem('profilePic');

            if (newComment.trim() && username) {
                setComments(prevComments => [
                    ...prevComments,
                    {
                        text: newComment,
                        profilePicture: profilePic,
                        name: username,
                        reactions: {
                            like: 0,
                            love: 0,
                            haha: 0
                        }
                    }
                ]);
                quill.innerHTML = ''; // Clear the editor
            }
        }
    };

    const handleReaction = (index, reactionType) => {
        setComments(prevComments => {
            const newComments = [...prevComments];
            newComments[index].reactions[reactionType] += 1;
            return newComments;
        });
    };

    return (
        <div className='comment-section'>
            <CommentEditor onSubmit={handleSubmit} />
            <CommentList comments={comments} onReaction={handleReaction} />
        </div>
    );
}
