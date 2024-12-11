import React, { useEffect, useRef } from "react";

const TradingViewMarketOverview = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      largeChartUrl: "",
      isTransparent: false,
      showSymbolLogo: true,
      width: "100%",
      height: 500,
      symbolsGroups: [
        {
          name: "Cryptocurrencies",
          symbols: [
            { name: "CRYPTOCAP:BTC", displayName: "Bitcoin" },
            { name: "CRYPTOCAP:ETH", displayName: "Ethereum" },
            { name: "CRYPTOCAP:BNB", displayName: "Binance Coin" },
          ],
        },
        {
          name: "Stocks",
          symbols: [
            { name: "NASDAQ:AAPL", displayName: "Apple" },
            { name: "NASDAQ:MSFT", displayName: "Microsoft" },
            { name: "NASDAQ:GOOGL", displayName: "Google" },
          ],
        },
      ],
    });

    if (widgetRef.current) {
      widgetRef.current.appendChild(script);
    }

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = ""; // Clean up
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container  w-full mx-auto my-6">
      <h2 className="text-xl lg:text-5xl font-bold text-center mb-4">
        Market Overview
      </h2>
      <div
        ref={widgetRef}
        className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewMarketOverview;
