import { useEffect, useState } from "react";
import "../index.css";

const CryptoTicker = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const data = await response.json();
        // Duplicate the array for seamless looping
        setAssets([...data, ...data]);
      } catch (error) {
        console.error(
          "Line 17 Crypto Ticker Error fetching crypto data:",
          error
        );
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <div className="overflow-hidden relative w-full bg-transparent">
      <div className="flex items-center animate-ticker-opposite animate-pause-on-hover">
        {assets.map((asset, index) => (
          <div
            key={`${asset.id}-${index}`}
            className="cursor-pointer flex-shrink-0 flex items-center space-x-2 bg-white hover:bg-brown-light p-2 rounded shadow sm:min-w-[200px] mx-1 sm:mx-4">
            <img
              src={asset.image}
              alt={asset.name}
              className="h-6 w-6 object-contain"
            />
            <span className="text-sm font-medium">{asset.name}</span>
            <span
              className={`text-sm ${
                asset.price_change_percentage_24h > 0
                  ? "text-green"
                  : "text-red-500"
              }`}>
              {asset.price_change_percentage_24h > 0 ? "↑" : "↓"}
              {asset.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoTicker;
