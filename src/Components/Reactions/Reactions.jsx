import React from 'react';
import './Reactions.css'; 

const Reactions = ({ reactions, onReaction }) => {
    return (
        <div className="reactions">
            <button className="reaction-button" onClick={() => onReaction('like')}>
                👍 {reactions.like}
            </button>
            <button className="reaction-button" onClick={() => onReaction('love')}>
                ❤️ {reactions.love}
            </button>
            <button className="reaction-button" onClick={() => onReaction('haha')}>
                😂 {reactions.haha}
            </button>
        </div>
    );
};

export default Reactions;
