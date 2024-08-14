import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      onSubmit({ name, comment, createdAt: new Date() });
      setName('');
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg border border-gray-300">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-lg p-2 w-full mb-2"
      />
      <textarea
        placeholder="Your Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="4"
        className="border rounded-lg p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
