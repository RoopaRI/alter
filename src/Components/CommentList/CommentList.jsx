import React from 'react';
import Comment from '../Comment/Comment';
import './CommentList.css';

const CommentList = ({ comments, onReaction, onReply }) => {
    return (
        <div className="comments-list">
            {comments.length > 0 ? comments.map((comment, index) => (
                <Comment 
                    key={comment.id} 
                    comment={comment} 
                    index={index} 
                    onReaction={onReaction}
                    onReply={onReply}
                />
            )) : <p className='default'>No comments yet.</p>}
        </div>
    );
};

export default CommentList;
