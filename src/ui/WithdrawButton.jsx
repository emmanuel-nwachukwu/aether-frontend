import { NavLink } from "react-router-dom";

const WithdrawButton = () => {
  return (
    <div>
      <NavLink
        to="/user/wallet/withdraw"
        className="bg-brown-dark rounded border-1  border-brown-light mt-2 px-5 py-3 text-white hover:text-black transition-all duration-300 ease-in-out">
        Withdraw
      </NavLink>
    </div>
  );
};

export default WithdrawButton;
