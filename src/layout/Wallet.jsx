// import { NavLink } from "react-router-dom";
import DepositButton from "../ui/DepositButton";
import WithdrawButton from "../ui/WithdrawButton";
// import { FormOutlined } from "@ant-design/icons";
import { BalanceContext } from "../contexts/useGlobalContext";
import { useContext } from "react";

const Wallet = () => {
  const { balanceTotal, balanceUSDT, balanceLTC, balanceBTC } =
    useContext(BalanceContext);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Wallet</h1>
      <div>
        <div className="max-w-[500px]">
          <div className="mb-4">
            <div className="flex items-center gap-5 mb-8">
              <DepositButton />
              <WithdrawButton />
            </div>
            <h2 className="text-2xl font-medium">Deposit (USDT - TRC20)</h2>
            <div className="flex items-center justify-between">
              <p>${balanceUSDT}</p>
              {/* <NavLink to="select" className="text-red-400">
              Change <FormOutlined />
            </NavLink> */}
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-medium ">BTC</h2>
            <span>${balanceBTC}</span>
          </div>{" "}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-medium ">LTC</h2>
            <span>${balanceLTC}</span>
          </div>{" "}
          <div className="flex items-center justify-between font-bold">
            <h2 className="text-2xl">Total Balance</h2>
            <span>${balanceTotal}</span>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
