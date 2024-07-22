// client/src/Blog.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  // Fetch posts on initial component load
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/blogs', { title, content, author });
      alert('Post created successfully');
      fetchPosts(); // Refresh posts after new post is created
      setTitle('');
      setContent('');
      setAuthor('');
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Error creating post');
    }
  };

  return (
    <div>
      <h1>Startup Blog</h1>
       <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" required />
        <button type="submit">Create Post</button>
      </form>
      
      {/* <div>
        {posts.map(post => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
          </div>
        ))}
       </div> */}
    
      </div>
  );
};

export default Blog;
