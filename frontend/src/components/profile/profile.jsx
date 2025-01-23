import './profile.css';

const ProfileCard = () => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER; 
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-image-container">
          <img src={`${PF}person/10.jpg`}  alt="Profile of" className="profile-image" />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">Ayush Sharma<span className="profile-username"> / @ayush-018</span></h2>
          <p className="profile-job">Software Engineer</p>
        </div>
      

      <div className="profile-stats">
          <div className='profile-stat'>
            <span className="stat-count">12</span>
            <span className="stat-label">Posts</span>
        </div>
        <div className='profile-stat'>
            <span className="stat-count">207</span>
            <span className="stat-label">Followers</span>
        </div>
        <div className='profile-stat'>
            <span className="stat-count">64</span>
            <span className="stat-label">Following</span>
        </div>
      </div>
      </div>
      <div className="profile-tabs">
          <span className="tab">My Posts</span>
          <span className="tab">Saved Posts</span>
          <span className="tab">Settings</span>
      </div>
    </div>
  );
};

export default ProfileCard;