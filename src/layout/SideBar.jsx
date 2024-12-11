import { Navigate, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  HomeOutlined,
  WalletOutlined,
  UserOutlined,
  LogoutOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import "../index.css";
import PropTypes from "prop-types";
import colorLogo from "../assets/colour-no-texts.png";
import DepositButton from "../ui/DepositButton";
import WithdrawButton from "../ui/WithdrawButton";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/useGlobalContext";
// import { useEffect } from "react";
const SideBar = ({
  balanceTotal,
  toggleSideBar,
  sideBarShow,
  setShowSideBar,

  setSelected,
}) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const { totalInterest } = useContext(GlobalContext);

  useEffect(() => {
    if (currentPath !== location.pathname) setCurrentPath(location.pathname);
    // console.log(currentPath);
  }, [location.pathname, currentPath, setCurrentPath, setSelected]);

  const handleItemClick = (item) => {
    setSelected(item);

    // Check if the screen width is 640px or less and toggle the sidebar
    if (window.innerWidth <= 640) {
      setShowSideBar(false);
      toggleSideBar();
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    Navigate("/signin");
  };

  return (
    <div
      className={`${
        sideBarShow ? "sidebar-show" : "sidebar-hidden"
      } w-64 min-h-[100vh] bg-brown-light flex flex-col p-4 fixed top-0 left-0 transition-transform duration-300 ease-in-out`}>
      <button
        onClick={toggleSideBar}
        className="exit-btn sm:hidden absolute top-4 right-4 text-xl text-black rounded">
        ✕
      </button>
      {/* <div className="flex items-center mb-4">
        <span className="text-lg font-bold">Aether</span>
      </div>{" "} */}
      <NavLink
        to="/"
        className={`home-logo-text flex items-center mb-8 `}
        onClick={() => handleItemClick("DashboardContent")}>
        <div className=" w-11 h-11 object-contain overflow-hidden relative">
          <img
            className=" scale-150 transform-gpu relative bottom-1"
            src={colorLogo}
            alt="Aether-logo"
          />
        </div>
        <span className="text-2xl font-bold hover:text-brown">Aether</span>
      </NavLink>
      {/* Balance */}
      <div className="mb-10">
        <span className="font-bold">Account Balance</span>
        <div className="flex gap-1 font-medium">
          <span>{balanceTotal} </span> <span>USD</span>
        </div>
        <div className="flex font-medium gap-1">
          <span>{totalInterest}</span>
          <span> USD (Interest Wallet)</span>
        </div>
        <div className="flex items-center gap-5 mt-6">
          <DepositButton />
          <WithdrawButton />
        </div>
      </div>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="dashboard"
          className={`sidebar-item ${
            currentPath.startsWith("/user/dashboard") ? "active-item" : ""
          }`}
          onClick={() => handleItemClick("DashboardContent")}>
          <HomeOutlined />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="plans"
          className={`sidebar-item ${
            // selected === "Plans" ||
            currentPath.startsWith("/user/plans") ? "active-item" : ""
          }`}
          onClick={() => handleItemClick("Plans")}>
          <WalletOutlined />
          <span>Plans</span>
        </NavLink>

        <NavLink
          to="transactions"
          className={`sidebar-item ${
            currentPath.startsWith("/user/transactions") ? "active-item" : ""
          }`}
          onClick={() => handleItemClick("Transactions")}>
          <WalletOutlined />
          <span>Transactions</span>
        </NavLink>

        <NavLink
          to="wallet"
          className={`sidebar-item ${
            currentPath.startsWith("/user/wallet") ? "active-item" : ""
          }`}
          onClick={() => handleItemClick("Wallet")}>
          <WalletOutlined />
          <span>Wallet</span>
        </NavLink>

        <NavLink
          to="verification"
          className={`sidebar-item ${
            currentPath.startsWith("/user/verification") ? "active-item" : ""
          }`}
          onClick={() => handleItemClick("Verification")}>
          <WalletOutlined />
          <span>Verification</span>
        </NavLink>

        <NavLink
          to="profile"
          className={`sidebar-item ${
            currentPath.startsWith("/user/profile") ? "active-item" : ""
          }`}
          onClick={() => handleItemClick("Profile")}>
          <UserOutlined />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="chat"
          className={`sidebar-item ${
            currentPath.startsWith("/user/chat") ? "active-item" : ""
          }`}
          onClick={() => handleItemClick("Chat")}>
          <MessageOutlined />
          <span>Chat</span>
        </NavLink>

        <NavLink
          to="logout"
          className={`sidebar-item ${
            currentPath.startsWith("/user/logout") ? "active-item" : ""
          }`}
          onClick={() => handleLogout()}>
          <LogoutOutlined />
          <span>Logout</span>
        </NavLink>
      </nav>
    </div>
  );
};

SideBar.propTypes = {
  balanceTotal: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  sideBarShow: PropTypes.bool,
  toggleSideBar: PropTypes.func,
  currentPath: PropTypes.string,
  setShowSideBar: PropTypes.func,
};

export default SideBar;
