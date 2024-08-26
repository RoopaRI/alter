import React from 'react';
import Reactions from '../Reactions/Reactions';
import './Comment.css'; // Create and use this CSS file for styling if needed

const Comment = ({ comment, index, onReaction }) => {
    return (
        <div className="comment">
            <div className="comment-header">
                <img src={comment.profilePicture} alt={`${comment.name}'s profile`} className="profile-picture" />
                <span className="commenter-name">{comment.name}</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: comment.text }} /> {/* Render comment */}
            <Reactions 
                reactions={comment.reactions} 
                onReaction={(reactionType) => onReaction(index, reactionType)}
            />
        </div>
    );
};

export default Comment;
