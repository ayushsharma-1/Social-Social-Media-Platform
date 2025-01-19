import "./topbar.css";
import { Search, Person } from "@mui/icons-material";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
          <img src="assets/Logo.jpg" alt="Logo of Social" className="Logo"/>
          <span className="LogoText">Social</span>
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
