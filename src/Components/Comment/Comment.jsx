import React, { useState } from 'react';
import Reactions from '../Reactions/Reactions';
import './Comment.css';

const Comment = ({ comment, index, onReaction }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const timeAgo = getTimeAgo(comment.timestamp);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="comment">
            <div className="comment-header">
                <img src={comment.profilePicture} alt={`${comment.name}'s profile`} className="profile-picture" />
                <span className="commenter-name">{comment.name}</span>
            </div>
            <div className={`comment-text ${isExpanded ? 'expanded' : ''}`} dangerouslySetInnerHTML={{ __html: comment.text }} />
            <span className="show-more-less" onClick={toggleExpand}>
                {isExpanded ? 'Show less' : 'Show more'}
            </span>
            <div className="reaction-time">
                <Reactions 
                    reactions={comment.reactions} 
                    onReaction={(reactionType) => onReaction(index, reactionType)}
                />
                <span className="comment-time">{timeAgo}</span>
            </div>
            
        </div>
    );
};

const getTimeAgo = (timestamp) => {
    const now = new Date();
    const secondsAgo = Math.floor((now - new Date(timestamp)) / 1000);

    if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo} hours ago`;
    const daysAgo = Math.floor(hoursAgo / 24);
    return `${daysAgo} days ago`;
};

export default Comment;
