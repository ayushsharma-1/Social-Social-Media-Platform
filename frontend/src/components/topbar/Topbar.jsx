import "./topbar.css";
import { Search, Person } from "@mui/icons-material";
import { Link } from 'react-router-dom';

export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; 
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
      <img src={`${PF}Logo.jpg`} alt="Logo of Social" className="Logo" />
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
        <div className="Logout">
          <span className="LogText"> Logout</span>
          <Person/>
        </div>
      </div>
    </div>
  );
}
