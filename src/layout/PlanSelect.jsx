// import { NavLink } from "react-router-dom";
import { Card } from "antd";
import PlansPopUp from "../ui/PlansPopUp";
import { useState } from "react";


const PlanSelect = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(""); // State for selected plan
  const [investment, setInvestment] = useState("");
  const [interest, setInterest] = useState("");
  const [days, setDays] = useState("");

  const showPopup = (plan) => {
    setSelectedPlan(plan); // Set selected plan name
    setPopupVisible(true);

    if (plan === "basic") {
      setInvestment("$250.00 - $999.00");
      setInterest("3");
      setDays("7");
    } else if (plan === "silver") {
      setInvestment("$5,008.00");
      setInterest("128.69");
      setDays("3");
    } else {
      setInvestment("$10,001.00 - $50,000.00");
      setInterest("3");
      setDays("7");
    }
  };

  const hidePopup = () => {
    setPopupVisible(false);
    setSelectedPlan(""); // Reset selected plan
    setInvestment(""); // Reset investment value
    setInterest(""); // Reset interest value
    setDays(""); // Reset day value
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Investment Plans</h1>
      <div className="flex flex-wrap items-center gap-4">
        <Card
          style={{
            minWidth: 300,
            flex: 1,
            maxWidth: 400,
          }}>
          <div className="w-full flex flex-col gap-2 items-center justify-center">
            <span className="text-2xl font-medium">Basic</span>
            <span className="text-md">Total 21% ROI</span>
            <span className="text-5xl font-medium">3.00%</span>
            <span className="text-md mb-5">EVERY DAY FOR 7 DAYS</span>
            <div className="w-full flex items-center justify-between">
              <span>Investment</span>
              <span>&gt; $250</span>
            </div>
            <div className="w-full flex items-center justify-between">
              <span>Max. Earn</span>
              <span>209.79 USD</span>
            </div>
            <div className="w-full flex items-center justify-between mb-8">
              <span>Total Return</span>
              <span>Capital + 21%</span>
            </div>
            <button
              name="basic"
              type="primary"
              onClick={() => showPopup("basic")}
              className="w-full flex items-center justify-center rounded py-4 text-lg font-bold text-white bg-brown-dark hover:text-white hover:bg-brown transition-all duration-300 ease-in-out">
              Invest Now
            </button>
          </div>
        </Card>
        <Card
          style={{
            minWidth: 300,
            flex: 1,
            maxWidth: 400,
          }}>
          <div className="w-full flex flex-col gap-2 items-center justify-center">
            <span className="text-2xl font-medium">Silver</span>
            <span className="text-md">Total 386.07% ROI</span>
            <span className="text-5xl font-medium">128.69%</span>
            <span className="text-md mb-5">EVERY DAY FOR 3 DAYS</span>
            <div className="w-full flex items-center justify-between">
              <span>Investment</span>
              <span>$5,008.00</span>
            </div>
            <div className="w-full flex items-center justify-between">
              <span>Max. Earn</span>
              <span>19,334.39 USD</span>
            </div>
            <div className="w-full flex items-center justify-between mb-8">
              <span>Total Return</span>
              <span>Capital + 386.07%</span>
            </div>
            <button
              name="silver"
              type="primary"
              onClick={() => showPopup("silver")}
              className="w-full flex items-center justify-center rounded py-4 text-lg font-bold text-white bg-brown-dark hover:text-white hover:bg-brown transition-all duration-300 ease-in-out">
              Invest Now
            </button>
          </div>
        </Card>
        <Card
          style={{
            minWidth: 280,
            flex: 1,
            maxWidth: 400,
          }}>
          <div className="w-full flex flex-col gap-2 items-center justify-center">
            <span className="text-2xl font-medium">Gold</span>
            <span className="text-md">Total 42% ROI</span>
            <span className="text-5xl font-medium">6.00%</span>
            <span className="text-md mb-5">EVERY DAY FOR 7 DAYS</span>
            <div className="w-full flex items-center justify-between">
              <span>Investment</span>
              <span>&gt; $10,001.00</span>
            </div>
            <div className="w-full flex items-center justify-between">
              <span>Max. Earn</span>
              <span>21,000.00 USD</span>
            </div>
            <div className="w-full flex items-center justify-between mb-8">
              <span>Total Return</span>
              <span>Capital + 21%</span>
            </div>

            <button
              name="gold"
              type="primary"
              onClick={() => showPopup("gold")}
              className="w-full flex items-center justify-center rounded py-4 text-lg font-bold text-white bg-brown-dark hover:text-white hover:bg-brown transition-all duration-300 ease-in-out">
              Invest Now
            </button>
          </div>
        </Card>
      </div>
      {/* PopupCard component rendered conditionally */}
      {isPopupVisible && (
        <PlansPopUp
          onClose={hidePopup}
          plan={selectedPlan}
          investment={investment}
          interest={interest}
          days={days}
        />
      )}{" "}
    </div>
  );
};

export default PlanSelect;
