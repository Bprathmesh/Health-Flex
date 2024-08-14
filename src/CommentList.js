import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, onReplySubmit, onVote, onEmojiClick }) => {
  return (
    <div>
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          onReplySubmit={onReplySubmit}
          onVote={onVote}
          onEmojiClick={onEmojiClick}
        />
      ))}
    </div>
  );
};

export default CommentList;
