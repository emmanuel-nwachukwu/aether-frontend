import PropTypes from "prop-types";

const UnprotectedRoutes = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-white to-brown-light min-h-screen h-full  transition-bg duration-2000 ease-in-out hover:bg-gradient-to-bl hover:from-brown-light hover:to-white">
      {children}
    </div>
  );
};

UnprotectedRoutes.propTypes = {
  children: PropTypes.node,
};

export default UnprotectedRoutes;
