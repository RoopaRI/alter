import React, { useState } from 'react';
import CommentEditor from '../CommentEditor/CommentEditor';
import CommentList from '../CommentList/CommentList';
import './CommentBox.css';
import Pagination from '../Pagination/Pagination';

export default function CommentBox() {
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 8; // Set the number of comments per page

    // Define the submit handler for new comments
    const handleSubmit = () => {
        const quill = document.querySelector('.comment-box .ql-editor');
        if (quill) {
            const newComment = quill.innerHTML;
            const username = localStorage.getItem('username');
            const profilePic = localStorage.getItem('profilePic');
            const timestamp = new Date().toISOString(); // Save the timestamp

            if (newComment.trim() && username) {
                setComments(prevComments => [
                    ...prevComments,
                    {
                        text: newComment,
                        profilePicture: profilePic,
                        name: username,
                        timestamp: timestamp,
                        reactions: {
                            like: 0,
                            love: 0,
                            haha: 0
                        }
                    }
                ]);
                quill.innerHTML = ''; // Clear the editor
                setCurrentPage(1); // Reset to the first page after adding a new comment
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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the comments to display based on the current page
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    const totalPages = Math.ceil(comments.length / commentsPerPage);

    return (
        <div className='comment-section'>
            <CommentEditor onSubmit={handleSubmit} />
            <CommentList comments={currentComments} onReaction={handleReaction} />
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </div>
    );
}
