// CommentList.js

import React from 'react';
import CommentForm from './CommentForm';

const CommentList = ({ comments, onReplySubmit, onVote, onEmojiClick }) => {

  const renderComments = (comments) => (
    comments.map(comment => (
      <div key={comment.id} className="comment mb-4 p-4 bg-white rounded-lg shadow-sm">
        <p className="font-semibold">{comment.name}</p>
        <p>{comment.comment}</p>
        <div className="flex space-x-2 mt-2">
          <button onClick={() => onVote(comment.id, 'upvotes')}>Upvote ({comment.upvotes})</button>
          <button onClick={() => onVote(comment.id, 'downvotes')}>Downvote ({comment.downvotes})</button>
          {Object.keys(comment.reactions).map((emoji) => (
            <span key={emoji} className="mr-2">{emoji} {comment.reactions[emoji]}</span>
          ))}
          <button onClick={() => onEmojiClick({ emoji: '👍' }, comment.id)}>👍</button>
          <button onClick={() => onEmojiClick({ emoji: '❤️' }, comment.id)}>❤️</button>
          {/* Add more emojis as needed */}
        </div>
        <CommentForm onSubmit={(parentId, reply) => onReplySubmit(parentId, reply)} parentId={comment.id} isReply />
        {comment.replies.length > 0 && (
          <div className="replies ml-4">
            {renderComments(comment.replies)}
          </div>
        )}
      </div>
    ))
  );

  return (
    <div>
      {renderComments(comments)}
    </div>
  );
};

export default CommentList;