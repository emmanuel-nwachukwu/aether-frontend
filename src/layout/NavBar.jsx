import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";
// import "../index.css";
// import logo1 from "../assets/colored-no-bg.png";
import logo2 from "../assets/logo-lg.png";

const NavBar = () => {
  const firstName = localStorage.getItem("firstName");

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Determine the active route
  const activeRoute = location.pathname;

  return (
    <nav className="bg-white shadow-md pb-2">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <Link
            to="/"
            className="flex items-center gap-x-2 text-brown hover:text-brown-dark">
            <div className="overflow-hidden object-contain h-10 w-10">
              <img src={logo2} alt="Aether Logo" className="h-full w-full" />
            </div>
            Aether{" "}
            <span className="finance-text lg:hidden md:hidden">Finance</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-black">
          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About" },
            { path: "/plans", label: "Plans" },
            { path: "/product", label: "Product" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`hover:text-brown-light ${
                (item.path === "/" && activeRoute === "/") ||
                (item.path !== "/" && activeRoute.startsWith(item.path))
                  ? "text-brown font-bold"
                  : ""
              }`}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Login and Signup Buttons */}
        <div className="hidden md:flex space-x-4">
          {firstName ? (
            <Link
              to="/user/dashboard"
              className="px-4 py-2 bg-brown text-white rounded hover:bg-brown-dark hover:text-white">
              My Account
            </Link>
          ) : (
            <>
              <Link
                to="/signin"
                className="px-4 py-2 text-brown border border-brown rounded hover:bg-brown hover:text-white">
                SignIn
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-brown text-white rounded hover:bg-brown-dark hover:text-white">
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <MenuOutlined
            className="text-2xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        
        <div className="md:hidden bg-gray-100">
          <div className="space-y-4 py-4 px-4">
            {[
              { path: "/", label: "Home" },
              { path: "/about", label: "About" },
              { path: "/plans", label: "Plans" },
              { path: "/product", label: "Product" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block hover:text-brown-light ${
                  activeRoute === item.path ? "text-brown font-bold" : ""
                }`}
                onClick={() => setMenuOpen(false)} // Close menu on link click
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="space-y-2 px-4 mb-2">
            {firstName ? (
              <Link
                to="/user/dashboard"
                className="px-4 py-2 bg-brown text-white rounded hover:bg-brown-dark hover:text-white">
                My Account
              </Link>
            ) : (
              <>
                <Link to="/signin">
                  <button className="w-full px-4 py-2 mb-1 text-brown border border-brown rounded hover:bg-brown-dark hover:text-white">
                    SignIn
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="w-full px-4 py-2 bg-brown text-white rounded hover:bg-brown-dark">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
