import "./sidebar.css";
import { Home, Person, Chat, Notifications } from "@mui/icons-material";
import { Users } from "../../dummyData";

export default function Sidebar() {
  const user = Users.find((u) => u.id === 10);

  return (
    <div className="sidebar">
      <div className="sidebar-cover">
        <img
          src="/assets/ad.png"
          alt="Cover"
          className="cover-image"
        />
      </div>

      {user ? (
        <div className="sidebar-profile">
          <img
            src={user.profilePicture}
            alt={user.username}
            className="profile-avatar"
          />
          <h3 className="profile-name">{user.username}</h3>
          <p className="profile-job">Software Engineer</p>
        </div>
      ) : (
        <div className="sidebar-profile">
          <h3 className="profile-name">User Not Found</h3>
          <p className="profile-job">Unknown</p>
        </div>
      )}

      <div className="sidebar-menu">
        <ul className="menu-list">
          <li className="menu-item">
            <Home className="menu-icon" />
            <span className="menu-text">Home</span>
          </li>
          <li className="menu-item">
            <Person className="menu-icon" />
            <span className="menu-text">Profile</span>
          </li>
          <li className="menu-item">
            <Chat className="menu-icon" />
            <span className="menu-text">Messages</span>
          </li>
          <li className="menu-item">
            <Notifications className="menu-icon" />
            <span className="menu-text">Notifications</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
