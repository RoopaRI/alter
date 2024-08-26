import React from 'react';
import Comment from '../Comment/Comment';
import './CommentList.css'; // Create and use this CSS file for styling if needed

const CommentList = ({ comments, onReaction }) => {
    return (
        <div className="comments-list">
            {comments.length > 0 ? comments.map((comment, index) => (
                <Comment 
                    key={index} 
                    comment={comment} 
                    index={index} 
                    onReaction={onReaction}
                />
            )) : <p>No comments yet.</p>}
        </div>
    );
};

export default CommentList;
