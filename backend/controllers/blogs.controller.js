

import Blogs  from "../models/blog.model.js";

// Controller function to fetch all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Blogs.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error in getPosts controller:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const newPost = new Blogs({
      title,
      content,
      author,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error in createPost controller:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


