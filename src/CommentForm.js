import React, { useState } from 'react';

const CommentForm = ({ onSubmit, parentId = null, isReply = false }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the form from submitting and refreshing the page
    if (name.trim() && comment.trim()) {
      onSubmit(parentId, { name, comment, createdAt: Date.now(), upvotes: 0, downvotes: 0, replies: [] });
      setName('');
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-2">{isReply ? 'Reply' : 'Add Comment'}</h2>
      <div className="mb-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
        <textarea
          id="comment"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
      >
        {isReply ? 'Reply' : 'Submit'}
      </button>
    </form>
  );
};

export default CommentForm;