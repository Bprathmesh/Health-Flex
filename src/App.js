import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import SearchBar from './SearchBar';
import './App.css'; // or the path to your CSS file


const App = () => {
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date');

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    setComments(savedComments);
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleCommentSubmit = (parentId, comment) => {
    const newComment = { 
      ...comment, 
      id: Date.now(), 
      upvotes: 0, 
      downvotes: 0, 
      replies: [] 
    };

    if (parentId === null) {
      setComments(prevComments => [...prevComments, newComment]);
    } else {
      setComments(prevComments => prevComments.map(c => 
        c.id === parentId
          ? { ...c, replies: [...c.replies, newComment] }
          : c
      ));
    }
  };

  const handleVote = (id, type, isReply = false, parentId = null) => {
    const updateVote = (comment) => 
      comment.id === id ? { ...comment, [type]: comment[type] + 1 } : comment;

    if (isReply && parentId) {
      setComments(prevComments => prevComments.map(comment =>
        comment.id === parentId
          ? { ...comment, replies: comment.replies.map(updateVote) }
          : comment
      ));
    } else {
      setComments(prevComments => prevComments.map(updateVote));
    }
  };

  const handleEmojiClick = (emoji, commentId, isReply, parentId) => {
    console.log(`Emoji ${emoji.emoji} clicked for comment ${commentId}`);
    // Implement emoji reaction logic here
  };

  const filteredComments = comments
    .filter(comment =>
      comment.comment && typeof comment.comment === 'string' &&
      comment.comment.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'date') {
        return b.createdAt - a.createdAt;
      } else if (sortOption === 'likes') {
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      }
      return 0;
    });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Comments App</h1>
      <SearchBar onSearch={setSearchTerm} onSort={setSortOption} />
      <CommentForm onSubmit={(comment) => handleCommentSubmit(null, comment)} />
      <CommentList 
        comments={filteredComments} 
        onReplySubmit={handleCommentSubmit} 
        onVote={handleVote}
        onEmojiClick={handleEmojiClick}
      />
    </div>
  );
};

export default App;
