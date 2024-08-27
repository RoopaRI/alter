import React, { useState } from 'react';
import CommentEditor from '../CommentEditor/CommentEditor';
import CommentList from '../CommentList/CommentList';
import Pagination from '../Pagination/Pagination';
import './CommentBox.css';
import { toast } from 'react-toastify'; // Import the toastify library

export default function CommentBox() {
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 8;

    const totalPages = Math.ceil(comments.length / commentsPerPage);

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
                    id: Date.now(), // Unique ID for each comment
                    text: newComment,
                    profilePicture: profilePic,
                    name: username,
                    timestamp: new Date().toISOString(),
                    reactions: {
                        like: 0,
                        love: 0,
                        haha: 0
                    },
                    replies: [] // Initialize replies as an empty array
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
            const comment = newComments[index];
            comment.reactions[reactionType] += 1;
            return newComments;
        });
    };

    const handleReply = (commentIndex, replyText) => {
        setComments(prevComments => {
            const newComments = [...prevComments];
            const comment = newComments[commentIndex];
            comment.replies.push({
                id: Date.now(), // Unique ID for each reply
                text: replyText,
                profilePicture: localStorage.getItem('profilePic'),
                name: localStorage.getItem('username'),
                timestamp: new Date().toISOString(),
                reactions: {
                    like: 0,
                    love: 0,
                    haha: 0
                },
                replies: [] // Initialize nested replies as an empty array
            });
            return newComments;
        });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    return (
        <div className='comment-section'>
            <CommentEditor onSubmit={handleSubmit} />
            <CommentList comments={currentComments} onReaction={handleReaction} onReply={handleReply} />
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </div>
    );
}
