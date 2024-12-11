import { NavLink } from "react-router-dom";
import {
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "../index.css";
import PropTypes from "prop-types";
import colorLogo from "../assets/colour-no-texts.png";

const AdminSideBar = ({
  toggleSideBar,
  sideBarShow,
  setShowSideBar,
  selected,
  setSelected,
}) => {
  const handleItemClick = (item) => {
    setSelected(item);
    setShowSideBar(false);

    // Check if the screen width is 640px or less and toggle the sidebar
    if (window.innerWidth <= 640) {
      toggleSideBar();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/admin/signin"; // Redirect to sign-in page
  };

  return (
    <div
      className={`${
        sideBarShow ? "sidebar-show" : "sidebar-hidden"
      } w-64 min-h-[100vh] bg-blue-200 flex flex-col p-4 fixed top-0 left-0 transition-transform duration-300 ease-in-out`}>
      <button
        onClick={toggleSideBar}
        className="exit-btn sm:hidden absolute top-4 right-4 text-xl text-black rounded">
        ✕
      </button>
      <NavLink
        to="/"
        className={`home-logo-text flex items-center mb-8 `}
        onClick={() => handleItemClick("AdminDashboard")}>
        <div className="w-11 h-11 object-contain overflow-hidden relative">
          <img
            className="scale-150 transform-gpu relative bottom-1"
            src={colorLogo}
            alt="Aether-logo"
          />
        </div>
        <span className="text-2xl font-bold">Admin</span>
      </NavLink>

      <nav className="flex flex-col gap-4">
        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          className={`sidebar-item ${
            selected === "AdminDashboard" ? "active-item" : ""
          }`}
          onClick={() => handleItemClick("AdminDashboard")}>
          <HomeOutlined />
          <span>Dashboard</span>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="#"
          className={`sidebar-item ${
            selected === "Settings" ? "active-item" : ""
          }`}
          onClick={() => handleItemClick("Settings")}>
          <SettingOutlined />
          <span>Settings</span>
        </NavLink>

        {/* Logout */}
        <button className="sidebar-item" onClick={handleLogout}>
          <LogoutOutlined />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

AdminSideBar.propTypes = {
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  sideBarShow: PropTypes.bool,
  toggleSideBar: PropTypes.func,
  setShowSideBar: PropTypes.func,
};

export default AdminSideBar;
