import React, { useState } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const App = () => {
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (comment) => {
    setComments([...comments, { ...comment, id: Date.now() }]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Comments App</h1>
      <CommentForm onSubmit={handleCommentSubmit} />
      <CommentList comments={comments} />
    </div>
  );
};

export default App;