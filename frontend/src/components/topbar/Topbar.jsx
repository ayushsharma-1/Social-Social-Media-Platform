import "./topbar.css";
import { Search, Person } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext); // Get the logged-in user context
  const navigate = useNavigate(); // React Router's navigation hook

  const handleProfileClick = () => {
    // Navigate to the user's profile page
    navigate(`/profile/${user.username}`);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <img src="/Logo.jpg" alt="Logo of Social" className="Logo" />
        <span className="LogoText">
          <Link to="/Home">Social</Link>
        </span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        {user ? (
          <div className="profileContainer" onClick={handleProfileClick}>
            <img
              src={user.profilePicture || "/person/noAvatar.png"} // Directly using the profile picture from user object
              alt="Profile"
              className="topbarProfileImg"
            />
          </div>
        ) : (
          <div className="Logout">
            <span className="LogText">Logout</span>
            <Person />
          </div>
        )}
      </div>
    </div>
  );
}
