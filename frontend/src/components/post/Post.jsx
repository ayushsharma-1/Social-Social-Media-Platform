import "./post.css";
import {
  MoreHoriz,
  ChatBubbleOutline,
  ThumbUpAltOutlined,
  ThumbUpAlt,
} from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js"; // To format the date
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);  // Track the number of likes
  const [isLiked, setIsLiked] = useState(post.likes.includes(post.userId));  // Track if the current user has liked the post
  const [user, setUser] = useState(null); // To store user data
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext); // Get current user from AuthContext

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);
  // Fetch user data when post.userId changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data); // Set user data
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUser();
  }, [post.userId]);

  // Update like state when currentUser likes the post
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id)); // Check if the current user has liked the post
  }, [currentUser._id, post.likes]);

  // Handle like and unlike functionality
  const likeHandler = async () => {
    try {
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
      setLike(isLiked ? like - 1 : like + 1); // Update like count
      setIsLiked(!isLiked); // Toggle the like state
    } catch (err) {
      console.error("Error liking the post:", err);
    }
  };

  // Handle image double-click to like
  const imageDoubleClickHandler = () => {
    if (!isLiked) {
      likeHandler(); // Call likeHandler when double-clicked
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
                <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.date)}</span>
          </div>
          <div className="postTopRight">
            <MoreHoriz />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img
            className="postImg"
            src={post.photo}
            alt="Post"
            onDoubleClick={imageDoubleClickHandler}
          />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <div className="postAction" onClick={likeHandler}>
              {isLiked ? (
                <ThumbUpAlt className="actionIcon" style={{ color: "red" }} />
              ) : (
                <ThumbUpAltOutlined className="actionIcon" style={{ color: "gray" }} />
              )}
              <span className="postActionText">Like</span>
            </div>
            <div className="postAction">
              <ChatBubbleOutline className="actionIcon" style={{ color: "gray" }} />
              <span className="postActionText">Comment</span>
            </div>
          </div>

          <div className="postBottomRight">
            <span className="postStats">
              {like} Likes • {post.comment} Comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
