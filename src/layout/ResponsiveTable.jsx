import { Link } from "react-router-dom";

const ResponsiveTable = () => {
  const rows = [
    "Spreads:",
    "Commissions:",
    "Execution:",
    "Leverage:",
    "Trading Terminal:",
    "Account Currency:",
    "Symbols:",
    "ROI:",
    "Open Positions:",
    "Stop Out Levels:",
    "Personal Account Manager:",
    "Crypto Trading:",
    "Scalping",
    "",
    "",
  ];
  const columns = ["Bronze", "Silver", "Gold"];
  const data = [
    ["From 2.8 pips", "From 1.5 pips", "From 0.1 pips"],
    ["No", "No", "No"],
    [
      "STP, Market, No requotes",
      "STP, Market, No requotes",
      "STP, Market, No requotes",
    ],
    ["1:100", "1:200", "1:400"],
    ["WebTrader", "WebTrader", "WebTrader"],
    ["USD", "USD", "USD"],
    [
      "50 Currency pairs, 45+ CFD",
      "50 Currency pairs, 45+ CFD",
      "50 Currency pairs, 45+ CFD",
    ],
    ["3% Daily ROI", "128.69% Daily ROI", "6% Daily ROI"],
    ["Unlimited", "Unlimited", "Unlimited"],
    ["5%", "5%", "5%"],
    ["Yes", "Yes", "Yes"],
    ["Yes", "Yes", "Yes"],
    ["Allowed", "Allowed", "Allowed"],
    ["$250 - $1,000 USD", "$5,000 - $10,000 USD", "$10k - $50k USD"],
    ["Trade", "Trade", "Trade"],
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-none">
        <thead>
          <tr>
            <th></th>
            {columns.map((col, index) => (
              <th
                key={index}
                className="border border-brown-light bg-brown text-white text-center px-4 py-2">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex >= 13 ? "border-none" : ""} // Different background for additional rows
            >
              <th
                className={`${
                  rowIndex < 13 ? "border border-brown-light bg-brown" : ""
                }  text-white text-center px-4 py-2`}>
                {row}
              </th>
              {data[rowIndex].map((cell, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className={`text-center px-4 py-2  ${
                    rowIndex < 13 ? "border border-brown-light" : "pt-5 sm:pt-8"
                  }`}>
                  {rowIndex === 14 ? (
                    <Link
                      to="/signup"
                      className="text-center whitespace-normal bg-green hover:bg-green-dark text-white hover:text-white px-4 py-2 sm:text-xl rounded">
                      {cell}
                    </Link>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsiveTable;
