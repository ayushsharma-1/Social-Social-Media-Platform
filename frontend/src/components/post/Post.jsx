import "./post.css";
import {
  MoreHoriz,
  ChatBubbleOutline,
  ThumbUpAltOutlined,
  ThumbUpAlt,
} from "@mui/icons-material";
import { Users } from "../../dummyData";
import { useState } from "react";

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };


  const imageDoubleClickHandler = () => {
    if (!isLiked) {
      setLike(like + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        {/* Top Section */}
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=""
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === post?.userId)[0].username}
            </span>
            <span className="postDate">{post.date}</span>
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
            alt=""
            onDoubleClick={imageDoubleClickHandler} 
          />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            {/* Like Action */}
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
