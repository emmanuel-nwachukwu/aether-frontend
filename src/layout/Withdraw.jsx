import useNotification from "../customHooks/useNotification";
import { Select, InputNumber, Input, message } from "antd";
import { BalanceContext, GlobalContext } from "../contexts/useGlobalContext";

import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { endpoints } from "../api/endpoints";

const Withdraw = () => {
  const { onNotify } = useNotification();
  const navigate = useNavigate(); // Initialize the navigate hook
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("usdt"); // State for selected wallet
  const [walletAddress, setWalletAddress] = useState("");
  const { balanceUSDT, balanceLTC, balanceBTC } = useContext(BalanceContext);
  const { postData } = useContext(GlobalContext);
  const generateRandomUUID = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = () => {
    const onSucess = async () => {
      const data = {
        name: selectedWallet,
        description: "withdrawal",
        price: withdrawalAmount,
        orderNumber: generateRandomUUID(),
        orderStatus: "pending",
        walletAddress: walletAddress,
      };
      try {
        await postData(endpoints.asset.add, data);

        onNotify(
          "success",
          "Successful",
          "Withdrawal processing. Please Contact an Admin to complete your withdrawal."
        );
        setTimeout(() => {
          setWalletAddress(null);
          navigate("/user/transactions");
        }, 3000);
      } catch (err) {
        console.error("Line 44 Withdraw", err.message);
        message.error("Unable to process", err.message);
      }
    };

    if (withdrawalAmount > 24 && withdrawalAmount) {
      if (!walletAddress || walletAddress.length < 20) {
        onNotify("warning", "Failed", "Please input a valid address");
        return;
      }
      if (selectedWallet === "ltc") {
        if (parseFloat(withdrawalAmount) > parseFloat(balanceLTC)) {
          onNotify("warning", "Failed", "Please input a valid amount");
          return;
        }
      }
      if (selectedWallet === "btc") {
        if (parseFloat(withdrawalAmount) > parseFloat(balanceBTC)) {
          onNotify("warning", "Failed", "Please input a valid amount");
          return;
        }
      }
      if (selectedWallet === "usdt") {
        if (parseFloat(withdrawalAmount) > parseFloat(balanceUSDT)) {
          onNotify("warning", "Failed", "Please input a valid amount");
          return;
        }
      }

      return onSucess();
    }
    onNotify("warning", "Failed", "You cannot withdraw below $250");
  };

  const handleWalletChange = (value) => {
    setSelectedWallet(value); // Update state with selected wallet
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Withdraw</h1>
      <div className="flex items-center justify-center">
        <div className="bg-brown-light rounded-lg shadow-lg max-w-md w-full py-4">
          <div className="px-6 flex flex-col gap-4">
            <div>
              {/* <p className="font-bold text-lg text-red-900">
                !!! CONTACT SUPPORT TO COMPLETE YOUR WITHDRAWAL
              </p> */}
            </div>
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
                onChange={handleWalletChange}
                options={[
                  {
                    value: "usdt",
                    label: `Deposit Wallet (USDT - TRC20) - $${balanceUSDT}`,
                  },
                  {
                    value: "btc",
                    label: `BITCOIN (BTC) - ${balanceBTC}`,
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
                Investment Amount{" "}
                <span className="text-red-700 text-xl">*</span>
              </p>{" "}
              <InputNumber
                prefix="USD"
                placeholder="e.g 100"
                style={{
                  width: "100%",
                }}
                min={1}
                value={withdrawalAmount}
                W
                onChange={(value) => {
                  // Only set the value if it's a positive number
                  if (value > 0) {
                    setWithdrawalAmount(value);
                  } else {
                    setWithdrawalAmount(null); // Clear the input if invalid
                  }
                }}
              />
              <div className="mt-4">
                <p className="flex items-center gap-1 font-bold text-lg">
                  Wallet Address <span className="text-red-700 text-xl">*</span>
                </p>{" "}
                <Input
                  onChange={(e) => {
                    setWalletAddress(e.target.value);
                  }}
                  placeholder="e.g. 6jkacbh698bhcbjgvg"
                />
              </div>
            </div>

            <div className="w-full flex items-center justify-end gap-2">
              <button
                onClick={handleSubmit}
                className="text-md font-bold bg-brown-dark hover:bg-brown transition-all duration-300 ease-in-out text-white py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </div>

          {/** Render conditional content only when form is submitted */}
          {/* {isSubmitted && (
            <div className="mt-6 px-6">
              <p>Ensure you have copied the correct wallet address</p>
              {renderWalletAddress()}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
