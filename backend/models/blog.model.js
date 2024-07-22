import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		title: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		// createdAt, updatedAt
	},
	{ timestamps: true }
);

const Blogs = mongoose.model("Blogs", postSchema);

export default Blogs;
