import useNotification from "../customHooks/useNotification";
import { Select, InputNumber, message } from "antd";
import {
  BalanceContext,
  AddressContext,
  GlobalContext,
} from "../contexts/useGlobalContext";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import CopyText from "../ui/CopyText";
import { endpoints } from "../api/endpoints";

const Deposit = () => {
  const { onNotify } = useNotification();
  const navigate = useNavigate(); // Initialize the navigate hook
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("usdt"); // State for selected wallet
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission
  const { balanceUSDT, balanceLTC, balanceBTC } = useContext(BalanceContext);
  const { ltcWallet, btcWallet, usdtWallet } = useContext(AddressContext);
  const { postData } = useContext(GlobalContext);

  const generateRandomUUID = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = () => {
    const onSucessShowWallet = async () => {
      setIsSubmitted(true);

      if (isSubmitted) {
        const data = {
          name: selectedWallet,
          description: "deposit",
          price: investmentAmount,
          orderNumber: generateRandomUUID(),
          orderStatus: "pending",
        };
        try {
          await postData(endpoints.asset.add, data);
          onNotify("success", "Successful", "Deposit processing");
          setTimeout(() => {
            setIsSubmitted(false);
            navigate("/user/transactions");
          }, 2000);
        } catch (error) {
          console.error("Line 51 Deposit", error.message);
          message.error("Deposit Failed: ", error.message);
        }
      }
    };

    if (investmentAmount > 249) {
      onSucessShowWallet();
    } else {
      onNotify("warning", "Failed", "Input valid amount and try again");
      setIsSubmitted(false);
    }
  };

  const handleWalletChange = (value) => {
    setSelectedWallet(value); // Update state with selected wallet
    setIsSubmitted(false);
  };

  const renderWalletAddress = () => {
    switch (selectedWallet) {
      case "usdt":
        return (
          <div>
            <h2 className="text-lg font-bold">Deposit Wallet Details</h2>
            <p>
              You are depositing to USDT - TRC20 wallet. Please double check.
            </p>
            <p className="text-green font-semibold text-lg">
              Click Submit after making your transfer.
            </p>

            <div className="py-2 px-2 bg-white rounded my-4">
              {" "}
              <CopyText text={usdtWallet}></CopyText>
            </div>
          </div>
        );
      case "btc":
        return (
          <div>
            <h2 className="text-lg font-bold">Bitcoin Wallet Details</h2>
            <p>You are depositing to Bitcoin wallet.</p>
            <p className="text-green font-semibold text-lg">
              Click Submit after making your transfer.
            </p>{" "}
            <div className="py-2 px-2 bg-gray-300 rounded my-4">
              {" "}
              <CopyText text={btcWallet}></CopyText>
            </div>{" "}
          </div>
        );
      case "ltc":
        return (
          <div>
            <h2 className="text-lg font-bold">Litecoin Wallet Details</h2>
            <p>
              You are depositing to your Litecoin wallet. Double-check your
              details.
            </p>
            <p className="text-green font-semibold text-lg">
              Click Submit after making your transfer.
            </p>{" "}
            <div className="py-2 px-2 bg-gray-300 rounded my-4">
              {" "}
              <CopyText text={ltcWallet}></CopyText>
            </div>{" "}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Deposit</h1>
      <div className="flex items-center justify-center">
        <div className="bg-brown-light rounded-lg shadow-lg max-w-md w-full py-4">
          <div className="px-6 flex flex-col gap-4">
            <div>
              <p className="flex items-center gap-1 font-bold text-lg">
                Select Wallet <span className="text-red-700 text-xl">*</span>
              </p>
              <Select
                className=" hover:!border-brown"
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
                value={investmentAmount}
                onChange={(value) => {
                  // Only set the value if it's a positive number
                  if (value > 0) {
                    setInvestmentAmount(value);
                  } else {
                    setInvestmentAmount(null); // Clear the input if invalid
                  }
                }}
              />
            </div>

            {/** Render conditional content only when form is submitted */}
            {isSubmitted && (
              <div className="mt-6">
                <p>Ensure you have copied the correct wallet address.</p>
                {renderWalletAddress()}
              </div>
            )}

            <div className="w-full flex items-center justify-end gap-2">
              <button
                onClick={handleSubmit}
                className="text-md font-bold bg-brown-dark hover:bg-brown transition-all duration-300 ease-in-out text-white py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
