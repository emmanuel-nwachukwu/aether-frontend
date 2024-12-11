import { useEffect, useState } from "react";

const CoinMarketCapTicker = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT" // Example: Fetch Bitcoin data
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        // Set the data directly or you can process it if necessary
        setAssets([data]); // If you want to display only one asset, for example, Bitcoin
      } catch (error) {
        console.error("Line 21 cmcTicker Error fetching Binance data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <div className="overflow-hidden relative w-full bg-gray-100 h-16">
      <div className="flex items-center animate-ticker">
        {assets.map((asset, index) => (
          <div
            key={asset.symbol}
            className="flex-shrink-0 flex items-center space-x-2 bg-white p-2 rounded shadow min-w-[200px] mx-4">
            <span className="text-sm font-medium">{asset.symbol}</span>
            <span
              className={`text-sm ${
                parseFloat(asset.priceChangePercent) > 0
                  ? "text-green"
                  : "text-red-500"
              }`}>
              {parseFloat(asset.priceChangePercent) > 0 ? "↑" : "↓"}
              {parseFloat(asset.priceChangePercent).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinMarketCapTicker;
