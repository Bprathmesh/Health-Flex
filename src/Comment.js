import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="bg-gray-100 p-4 mb-4 rounded-lg">
      <h3 className="font-bold">{comment.name}</h3>
      <p className="mt-2">{comment.comment}</p>
      <span className="text-sm text-gray-500 mt-2">
        {new Date(comment.createdAt).toLocaleString()}
      </span>
    </div>
  );
};

export default Comment;