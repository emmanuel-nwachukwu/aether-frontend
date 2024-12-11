import PropTypes from "prop-types";
import { Select, InputNumber } from "antd";
import useNotification from "../customHooks/useNotification";
// import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { BalanceContext, GlobalContext } from "../contexts/useGlobalContext";
import { endpoints } from "../api/endpoints";

const PlansPopUp = ({ onClose, plan, investment, interest, days }) => {
  const { onNotify } = useNotification();
  const navigate = useNavigate(); // Initialize the navigate hook
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("usdt");
  const {
    balanceUSDT,
    balanceLTC,
    balanceBTC,
    setBalanceUSDT,
    setBalanceLTC,
    setBalanceBTC,
  } = useContext(BalanceContext);
  const { putData, postData, currentPlans } = useContext(GlobalContext);

  const generateRandomUUID = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = () => {
    // Check if the user already has a plan of the selected wallet type
    if (currentPlans.includes(plan)) {
      // If the user already has the same wallet type, notify them
      onNotify(
        "error",
        "Failed",
        `You already have a ${plan} plan. Please purchase a different plan.`
      );
      return;
    }

    const notifyAndNavigate = () => {
      onNotify("success", "Successful", "Successfully purchased a plan");
      setTimeout(() => {
        navigate("/user/plans");
      }, 2000);
    };
    let walletData = {};
    let withdrawalData = {};
    let updatedBalance;
    if (selectedWallet === "ltc") {
      if (investmentAmount >= balanceLTC) {
        onNotify(
          "error",
          "Failed",
          "Cannot invest more than available balance."
        );
        return;
      } else {
        updatedBalance = balanceLTC - investmentAmount;
        walletData = { LTC: updatedBalance };
        withdrawalData = {
          name: "USDT",
          description: "Inv. Dep.",
          price: investmentAmount,
          orderNumber: generateRandomUUID(),
          orderStatus: "completed",
        };
        setBalanceLTC(updatedBalance);
        // return;
      }
    }
    if (selectedWallet === "btc") {
      if (investmentAmount >= balanceBTC) {
        onNotify(
          "error",
          "Failed",
          "Cannot invest more than available balance."
        );
        return;
      } else {
        updatedBalance = balanceBTC - investmentAmount;
        walletData = { BTC: updatedBalance };
        withdrawalData = {
          name: "BTC",
          description: "Inv. Dep.",
          price: investmentAmount,
          orderNumber: generateRandomUUID(),
          orderStatus: "completed",
        };
        setBalanceBTC(updatedBalance);
        // return;
      }
    }
    if (selectedWallet === "usdt") {
      if (investmentAmount >= balanceUSDT) {
        onNotify(
          "error",
          "Failed",
          "Cannot Invest more than available balance."
        );
        return;
      } else {
        updatedBalance = balanceUSDT - investmentAmount;
        walletData = { USDT: updatedBalance };
        withdrawalData = {
          name: "USDT",
          description: "Inv. Dep.",
          price: investmentAmount,
          orderNumber: generateRandomUUID(),
          orderStatus: "completed",
        };
        setBalanceUSDT(updatedBalance);
        // return;
      }
    }

    const sendRequest = async () => {
      try {
        const planData = {
          initialValue: investmentAmount,
          selectedPlan: plan,
        };

        await putData(endpoints.wallet.update, walletData);
        await postData(endpoints.plans.add, planData);
        await postData(endpoints.asset.add, withdrawalData);
      } catch (error) {
        console.error("Line 101 planspopup: ", error.message);
        onNotify(
          "error",
          "Failed",
          "Could not process your request. Try again."
        );
      }
    };

    if (plan === "basic") {
      if (investmentAmount >= 250 && investmentAmount <= 999) {
        // post function here
        sendRequest();
        notifyAndNavigate();
      } else {
        onNotify(
          "error",
          "Failed",
          "Investment amount must be between $250 and $999 for Basic plan."
        );
        // onClose();
      }
    } else if (plan === "silver") {
      if (investmentAmount === 5008) {
        sendRequest();
        notifyAndNavigate();
      } else {
        onNotify(
          "error",
          "Failed",
          "Investment amount must be $5008 for Silver plan."
        );
        // onClose();
      }
    } else if (plan === "gold") {
      if (investmentAmount >= 10000 && investmentAmount <= 50000) {
        sendRequest();
        notifyAndNavigate();
      } else {
        onNotify(
          "error",
          "Failed",
          "Investment amount must be between $10,000 and $50,000 for Gold plan."
        );
        // onClose();
      }
    }
  };

  const onChange = (value) => {
    setSelectedWallet(value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full pb-2">
        <div className="flex justify-between items-center border-b-4 p-4">
          <span className="text-lg font-bold">Confirm {plan} Investment</span>
          <button
            onClick={onClose}
            className="exit-btn top-4 right-4 text-xl text-white rounded bg-brown-dark hover:bg-brown transition-all duration-300 ease-in-out">
            ✕
          </button>
        </div>
        <div className="p-6">
          <div className="">
            <div className="text-md mb-2">Investment: {investment}</div>
            <div className="text-md mb-2">Interest: {interest}</div>
            <div className="text-md mb-4">Every 24 hours for {days} days</div>
          </div>
        </div>
        <div className="px-6 flex flex-col gap-4">
          <div>
            <p className="flex items-center gap-1 font-bold text-lg">
              Select Wallet <span className="text-red-700 text-xl">*</span>
            </p>
            <Select
              style={{
                width: "100%",
              }}
              showSearch
              defaultValue="usdt"
              onChange={onChange}
              // onSearch={onSearch}
              options={[
                {
                  value: "usdt",
                  label: `Deposit Wallet (USDT - TRC20) - $${balanceUSDT}`,
                },
                {
                  value: "btc",
                  label: `BITCOIN (BTC) - $${balanceBTC}`,
                },
                {
                  value: "ltc",
                  label: `LITECOIN (LTC) - $${balanceLTC}`,
                },
              ]}
            />
          </div>

          <div>
            <p className="flex items-center gap-1 font-bold text-lg">
              Investment Amount <span className="text-red-700 text-xl">*</span>
            </p>{" "}
            <InputNumber
              prefix="USD"
              placeholder="e.g 100"
              style={{
                width: "100%",
              }}
              min={1}
              value={investmentAmount}
              onChange={(value) => {
                // Only set the value if it's a positive number
                if (value && value > 0) {
                  setInvestmentAmount(value);
                } else {
                  setInvestmentAmount(null); // Clear the input if invalid
                }
              }}
            />
          </div>

          <div className="w-full flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-md font-bold bg-brown hover:bg-brown-dark text-white py-2 px-4">
              Close
            </button>
            <button
              onClick={handleSubmit}
              className="text-md font-bold bg-brown hover:bg-brown-dark text-white py-2 px-4">
              OK
            </button>
          </div>
        </div>
        {/* Uncomment and style the Close button */}
        {/* <button
          onClick={onClose}
          className="mt-4 w-full bg-red-600 text-white py-2 rounded">
          Close
        </button> */}
      </div>
    </div>
  );
};

PlansPopUp.propTypes = {
  onClose: PropTypes.func.isRequired,
  plan: PropTypes.string.isRequired,
  investment: PropTypes.string.isRequired,
  interest: PropTypes.string.isRequired,
  days: PropTypes.string.isRequired,
};

export default PlansPopUp;
