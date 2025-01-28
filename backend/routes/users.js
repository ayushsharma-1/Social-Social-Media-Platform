const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json({ error: "Error hashing password", details: err.message });
      }
    }
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({ message: "Account has been updated successfully" });
    } catch (err) {
      return res.status(500).json({ error: "Error updating account", details: err.message });
    }
  } else {
    return res.status(403).json({ error: "You can update only your account" });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Account has been deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: "Error deleting account", details: err.message });
    }
  } else {
    return res.status(403).json({ error: "You can delete only your account" });
  }
});
//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving user", details: err.message });
  }
});

// Follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user) {
        return res.status(404).json({ error: "User to follow not found" });
      }
      if (!currentUser) {
        return res.status(404).json({ error: "Current user not found" });
      }

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json({ message: "User has been followed successfully" });
      } else {
        res.status(403).json({ error: "You already follow this user" });
      }
    } catch (err) {
      res.status(500).json({ error: "Error following user", details: err.message });
    }
  } else {
    res.status(403).json({ error: "You can't follow yourself" });
  }
});

// Unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user) {
        return res.status(404).json({ error: "User to unfollow not found" });
      }
      if (!currentUser) {
        return res.status(404).json({ error: "Current user not found" });
      }

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json({ message: "User has been unfollowed successfully" });
      } else {
        res.status(403).json({ error: "You don't follow this user" });
      }
    } catch (err) {
      res.status(500).json({ error: "Error unfollowing user", details: err.message });
    }
  } else {
    res.status(403).json({ error: "You can't unfollow yourself" });
  }
});

module.exports = router;
