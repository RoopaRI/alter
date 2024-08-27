import React, { useState, useEffect } from 'react';
import CommentEditor from '../CommentEditor/CommentEditor';
import CommentList from '../CommentList/CommentList';
import Pagination from '../Pagination/Pagination';
import './CommentBox.css';
import { toast } from 'react-toastify'; // Import the toastify library
import { db } from '../../googleSignIn/config'; // Import Firestore
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';

export default function CommentBox() {
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 8;

    const totalPages = Math.ceil(comments.length / commentsPerPage);

    useEffect(() => {
        // Fetch comments from Firestore when component mounts
        const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedComments = [];
            querySnapshot.forEach((doc) => {
                fetchedComments.push(doc.data());
            });
            setComments(fetchedComments);
        });

        // Clean up the listener on component unmount
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (quill) => {
        const text = quill.getText().trim();

        if (text.length === 0) {
            toast.error('Comment cannot be empty.');
            return;
        }

        const newComment = quill.root.innerHTML;
        const username = localStorage.getItem('username');
        const profilePic = localStorage.getItem('profilePic');

        if (username) {
            try {
                await addDoc(collection(db, 'comments'), {
                    text: newComment,
                    profilePicture: profilePic,
                    name: username,
                    timestamp: new Date().toISOString(),
                    reactions: {
                        like: 0,
                        love: 0,
                        haha: 0
                    }
                });
                quill.root.innerHTML = ''; // Clear the editor
                toast.success('Comment added successfully!');
            } catch (error) {
                toast.error('Failed to add comment. Please try again.');
            }
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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

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
