import { NavLink } from "react-router-dom";
import { FormOutlined } from "@ant-design/icons";
import { GlobalContext } from "../contexts/useGlobalContext";
import { useContext } from "react";

const Plans = () => {
  const { currentPlans, totalInterest, currentInvestment } =
    useContext(GlobalContext);

  // Calculate the sum of current investments
  const totalInvestment = currentInvestment.reduce(
    (acc, curr) => acc + curr,
    0
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Plans</h1>
      <div className="max-w-[500px]">
        <div className="mb-4">
          <h2 className="text-2xl font-medium">Current Plan</h2>
          <div className="flex items-center justify-between">
            <p className="font-bold">{currentPlans.join(", ") || "None"}</p>
            <NavLink
              to="select"
              className="hidden sm:flex items-center gap-1 text-brown font-semibold hover:text-brown-dark">
              Purchase Plan
              <FormOutlined />
            </NavLink>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-medium ">Interest Accrued</h2>
          <span>${totalInterest.toFixed(2) || "none"}</span>
        </div>{" "}
        <div className="flex items-center justify-between font-bold">
          <h2 className="text-2xl">Current Investment</h2>
          <span>${totalInvestment.toFixed(2)}</span>
        </div>{" "}
        <div className="text-center mt-12">
          <NavLink
            to="select"
            className="sm:hidden items-center gap-1 text-white hover:text-white transition-all duration-300 ease-in-out  hover:bg-brown-dark text-2xl font-semibold bg-brown rounded py-2 px-6">
            Purchase Plan
            {/* <FormOutlined /> */}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Plans;
