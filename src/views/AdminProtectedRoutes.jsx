import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AdminProtectedRoutes = ({ children }) => {
  if (!localStorage.getItem("***")) {
    return <Navigate to="/admin/signin" />;
  }

  return children;
};

AdminProtectedRoutes.propTypes = {
  children: PropTypes.node,
};

export default AdminProtectedRoutes;
