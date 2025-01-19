const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// Create a post
router.post("/", async (req, res) => {
  console.log("Creating post with body:", req.body);  // Log incoming body
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: savedPost });
  } catch (err) {
    console.error("Error creating post:", err);  // Log error
    res.status(500).json({ error: "Failed to create post", details: err.message });
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.userId === req.body.userId) {
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } else {
      res.status(403).json({ error: "You can update only your post" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update post", details: err.message });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(403).json({ error: "You can delete only your post" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post", details: err.message });
  }
});

// Like or dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json({ message: "Post liked successfully" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json({ message: "Post disliked successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to like/dislike post", details: err.message });
  }
});

// Get a post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve post", details: err.message });
  }
});

// Get timeline posts
router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json({ message: "Timeline posts retrieved", posts: userPosts.concat(...friendPosts) });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve timeline posts", details: err.message });
  }
});

module.exports = router;
