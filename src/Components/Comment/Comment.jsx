import React, { useState } from 'react';
import Reactions from '../Reactions/Reactions';
import './Comment.css';

const Comment = ({ comment, index, onReaction, onReply, level = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleReplyChange = (e) => setReplyText(e.target.value);

    const handleReplySubmit = () => {
        if (replyText.trim()) {
            onReply(index, replyText);
            setReplyText('');
            setShowReplyInput(false);
        }
    };

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const timeAgo = getTimeAgo(comment.timestamp);

    return (
        <div className={`comment level-${level}`}>
            <div className="comment-header">
                <img src={comment.profilePicture} alt={`${comment.name}'s profile`} className="profile-picture" />
                <span className="commenter-name">{comment.name}</span>
            </div>
            <div className={`comment-text ${isExpanded ? 'expanded' : ''}`} dangerouslySetInnerHTML={{ __html: comment.text }} />
            {comment.text.split('\n').length > 5 && level < 2 && (
                <span className="show-more-less" onClick={toggleExpand}>
                    {isExpanded ? 'Show less' : 'Show more'}
                </span>
            )}
            <div className="reaction-time">
                <Reactions 
                    reactions={comment.reactions} 
                    onReaction={(reactionType) => onReaction(index, reactionType)}
                />
                {(level < 2 && comment.replies.length === 0) && ( // Show reply button only for top-level and second-level comments
                    <button 
                        className="reply-btn" 
                        onClick={() => setShowReplyInput(!showReplyInput)}
                    >
                        Reply
                    </button>
                )}
                <span className="comment-time">{timeAgo}</span>
            </div>
            <div className="reply-section">
                {comment.replies.length > 0 && (
                    <div className="replies">
                        {comment.replies.map((reply, replyIndex) => (
                            <Comment 
                                key={reply.id} 
                                comment={reply} 
                                index={replyIndex} 
                                onReaction={onReaction} 
                                onReply={onReply}
                                level={level + 1} // Increment level for nested replies
                            />
                        ))}
                    </div>
                )}
                
                {showReplyInput && (
                    <div className="reply-input">
                        <textarea 
                        className='textrea'
                            value={replyText} 
                            onChange={handleReplyChange} 
                            placeholder="Write a reply..."
                        />
                        <button className='submit-btn' onClick={handleReplySubmit}>Submit Reply</button>
                    </div>
                )}
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
