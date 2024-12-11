import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("***");

  if (!token) {
    localStorage.clear();
    return <Navigate to="/signin" />;
  }

  try {
    // Decode the token to check its expiration
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    // console.log(decodedToken, "\n", currentTime);
    if (decodedToken.exp < currentTime) {
      // If token is expired, clear localStorage and redirect to signin
      localStorage.clear();
      return <Navigate to="/signin" />;
    }
  } catch (error) {
    // Handle invalid token or any decoding errors
    console.error(error);
    localStorage.clear();
    return <Navigate to="/signin" />;
  }

  return children;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoutes;
