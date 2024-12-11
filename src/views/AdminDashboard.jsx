import { useEffect, useState } from "react";
import AdminSideBar from "../layout/AdminSideBar";
import { MenuOutlined } from "@ant-design/icons"; // Ant Design Carousel
import DashBoardTable from "../layout/DashBoardTable";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const [sideBarShow, setSideBarShow] = useState(false);
  

  useEffect(() => {
    if (!localStorage.getItem("***")) {
      localStorage.clear();
      Navigate("/admin/signin");
    }
  }, []);

  const toggleSideBar = () => {
    setSideBarShow((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Sidebar */}
      <AdminSideBar
        sideBarShow={sideBarShow}
        toggleSideBar={toggleSideBar}
        setShowSideBar={setSideBarShow}
        selected={"AdminDashboard"}
        setSelected={() => {}} // Pass a function to manage selected item if needed
      />

      {/* Carousel */}
      {!sideBarShow && (
        <div className="fixed top-4 right-4 sm:hidden">
          <div
            className=" bg-brown-dark hover:bg-brown transition-all duration-300 ease-in-out p-4 rounded cursor-pointer text-white"
            onClick={toggleSideBar}>
            {/* <h3>Click here to open Sidebar</h3>> */}
            <MenuOutlined />
          </div>
        </div>
      )}

      {/* Main Content */}

      <div className={`sm:pl-64 ${sideBarShow ? "sm:pl-64" : ""}`}>
        <h1 className="text-xl font-bold p-4">Admin Dashboard</h1>
        <p className="p-4">
          Welcome to the Admin Dashboard! Manage your settings and view reports
          here.
        </p>
      </div>

      <div className="sm:pl-64">
        <DashBoardTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
