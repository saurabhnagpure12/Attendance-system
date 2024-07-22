import express from "express";
import { getPosts, createPost } from "../controllers/blogs.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.get("/:id",protectRoute, getPosts);          // Route to fetch all posts
router.post("/new", protectRoute,createPost);       // Route to create a new post


export default router;
