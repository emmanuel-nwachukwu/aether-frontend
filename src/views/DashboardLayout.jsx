// import { Card } from "antd";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import SideBar from "../layout/SideBar";
// import NavBar from "../layout/NavBar";
import {
  UserOutlined,
  MessageOutlined,
  MinusOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import "../index.css";
import { BalanceContext } from "../contexts/useGlobalContext";
import ChatComponent from "../ui/ChatComponent";

const DashboardLayout = () => {
  const location = useLocation(); // Get the current location
  const [selected, setSelected] = useState(
    () => localStorage.getItem("selectedTab") || "DashboardContent" // Load from localStorage or default
  );
  const [sideBarShow, setShowSideBar] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false); // State to toggle chat visibility
  const { balanceTotal } = useContext(BalanceContext);

  useEffect(
    () => {
      // Map the current path to a sidebar item (e.g., "/plans" or any nested path like "/plans/plan1" will set "Plans")
      const pathMap = {
        "/dashboard": "DashboardContent",
        "/plans": "Plans",
        "user/transactions": "Transactions",
        "/wallet": "Wallet",
        "/verification": "Verification",
        "/profile": "Profile",
        "/chat": "Chat",
        "/logout": "Logout",
      };
      const matchedPath = Object.keys(pathMap).find((path) =>
        location.pathname.startsWith(path)
      );
      if (matchedPath) {
        setSelected(pathMap[matchedPath]);
        localStorage.setItem("selectedTab", pathMap[matchedPath]); // Save to localStorage
      }
    },
    [location.pathname, selected],
    selected
  ); // Runs on location change

  useEffect(() => {
    // Save the selected tab to localStorage whenever it changes
    if (selected) {
      localStorage.setItem("selectedTab", selected);
    }
  }, [selected]);

  const toggleSidebar = () => {
    if (!sideBarShow) {
      setShowSideBar(true);
    } else {
      setShowSideBar(false);
    }
  };

  // Toggle Chat Component visibility
  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div className="min-h-[100vh]">
      <div className="flex items-center px-2 flex-row w-full h-16 mb-8 bg-white relative">
        <button
          onClick={toggleSidebar}
          className="carousel-btn sm:hidden bg-brown hover:bg-brown-dark text-white px-2 py-1 rounded">
          <MenuOutlined />
        </button>
        <NavLink
          to="profile"
          className="absolute right-0 mr-2"
          onClick={() => setSelected("Profile")}>
          <div className="rounded-full p-1 bg-brown-dark">
            <UserOutlined style={{ fontSize: "24px", color: "#f5f5f5" }} />
          </div>
        </NavLink>
      </div>
      {/* <div className="mb-10">
        <NavBar toggleSideBar={toggleSidebar} />
      </div> */}
      <div className="px-2">
        <div className="min-w-20 w-40 relative z-50">
          <div className="">
            <SideBar
              balanceTotal={balanceTotal}
              toggleSideBar={toggleSidebar}
              sideBarShow={sideBarShow}
              setShowSideBar={setShowSideBar}
              setSelected={setSelected}
            />
          </div>
        </div>

        {/* Outlet will render the child routes/components */}
        <div className="content-section ml-[15.9rem] md:px-6 max-w-[1200px]">
          <Outlet />
        </div>

        {/* Chat Toggle Button */}
        {location.pathname !== "/user/chat" &&
          location.pathname !== "/user/logout" && ( // Exclude the chat toggle on the /chat route
            <div
              className="chat-toggle-button fixed bottom-10 right-10 p-3 bg-green rounded-full text-white cursor-pointer"
              onClick={toggleChat}>
              <MessageOutlined style={{ fontSize: "24px" }} />
            </div>
          )}

        {/* Conditionally render ChatComponent */}
        {isChatVisible &&
          location.pathname !== "/user/chat" && ( // Exclude the chat component on the /chat route
            <div className="chat-component-container fixed bottom-0 right-0 mb-24 mr-5 w-96 bg-white p-4 shadow-lg rounded-lg">
              <ChatComponent />
              {/* Minimize Button */}
              <button
                className="minimize-button absolute top-10 right-24 flex items-center justify-center text-white rounded-lg  text-2xl border-2 border-transparent hover:!border-white font-extrabold bg-brown-dark transition-all duration-300 ease-in-out"
                onClick={toggleChat}>
                <MinusOutlined />
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default DashboardLayout;
