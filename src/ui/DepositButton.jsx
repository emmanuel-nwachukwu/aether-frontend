import { NavLink } from "react-router-dom";

const DepositButton = () => {
  return (
    <div>
      <NavLink
        to="/user/wallet/deposit"
        className="bg-brown-dark rounded border-1 border-brown-light mt-2 px-5 py-3 text-white hover:text-black transition-all duration-300 ease-in-out">
        Deposit
      </NavLink>
    </div>
  );
};

export default DepositButton;
