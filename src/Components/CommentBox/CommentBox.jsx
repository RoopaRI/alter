import React, { useState } from 'react';
import CommentEditor from '../CommentEditor/CommentEditor';
import CommentList from '../CommentList/CommentList';
import './CommentBox.css';
import { toast } from 'react-toastify'; // Import the toastify library

export default function CommentBox() {
    const [comments, setComments] = useState([]);

    const handleSubmit = (quill) => {
        const text = quill.getText().trim();

        if (text.length === 0) {
            toast.error('Comment cannot be empty.');
            return;
        }

        const newComment = quill.root.innerHTML;
        const username = localStorage.getItem('username');
        const profilePic = localStorage.getItem('profilePic');

        if (username) {
            setComments(prevComments => [
                ...prevComments,
                {
                    text: newComment,
                    profilePicture: profilePic,
                    name: username,
                    timestamp: new Date().toISOString(),
                    reactions: {
                        like: 0,
                        love: 0,
                        haha: 0
                    }
                }
            ]);
            quill.root.innerHTML = ''; // Clear the editor
            toast.success('Comment added successfully!');
        } else {
            toast.error('Failed to add comment. Please try again.');
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
