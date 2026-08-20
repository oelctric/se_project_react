import './SideBar.css';

function SideBar() {
  return (
    <div className="side-bar">
      <img
        className="side-bar__avatar"
        src="/images/avatar.png"
        alt="User avatar"
      />
      <div className="side-bar__data">
        <h2 className="side-bar__name">omar</h2>
        <span className="side-bar__action">Change profile data</span>
        <span className="side-bar__action">Log out</span>
      </div>
    </div>
  );
}

export default SideBar;
