import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import CommentForm from './CommentForm';

const Comment = ({ comment, onReplySubmit, onVote, onEmojiClick, isReply = false, parentId = null, level = 0 }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  // Ensure comment.emojis is always an object
  const emojis = comment.emojis || {};

  const handleUpvote = () => onVote(comment.id, 'upvotes', isReply, parentId);
  const handleDownvote = () => onVote(comment.id, 'downvotes', isReply, parentId);

  return (
    <div className={`bg-white p-4 mb-4 rounded-lg border border-gray-300 shadow-sm ${isReply ? `ml-${level * 4}` : ''}`}>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg">{comment.name}</h3>
        <span className="text-sm text-gray-500">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      <p className="mt-2 text-gray-700">{comment.comment}</p>
      <div className="flex items-center mt-4 space-x-4">
        <button onClick={handleUpvote} className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span>{comment.upvotes}</span>
        </button>
        <button onClick={handleDownvote} className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>{comment.downvotes}</span>
        </button>
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-gray-600 hover:text-yellow-500">
          😄 Add Reaction
        </button>
        <button onClick={() => setShowReplyForm(!showReplyForm)} className="text-gray-600 hover:text-blue-500">
          Reply
        </button>
      </div>
      {showEmojiPicker && (
        <div className="mt-2">
          <EmojiPicker onEmojiClick={(emoji) => {
            onEmojiClick(emoji, comment.id, isReply, parentId);
            setShowEmojiPicker(false);
          }} />
        </div>
      )}
      {showReplyForm && (
        <div className="mt-4">
          <CommentForm 
            parentId={comment.id} 
            isReply={true} 
            onSubmit={(parentId, replyData) => {
              onReplySubmit(parentId, replyData);
              setShowReplyForm(false);
            }} 
          />
        </div>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4">
          {comment.replies.map(reply => (
            <Comment 
              key={reply.id} 
              comment={reply} 
              onReplySubmit={onReplySubmit} 
              onVote={onVote}
              onEmojiClick={onEmojiClick} 
              isReply={true} 
              parentId={comment.id} 
              level={level + 1} // Increase indentation level for replies
            />
          ))}
        </div>
      )}
      {Object.keys(emojis).length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {Object.entries(emojis).map(([emoji, count]) => (
            <span key={emoji} className="text-xl">{emoji} {count}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
