import React, { useEffect, useRef } from "react";

const widgetData = [
  { symbol: "NASDAQ:AAPL", title: "Apple" },
  { symbol: "CRYPTOCAP:BTC", title: "Bitcoin" },
  { symbol: "CRYPTOCAP:ETH", title: "Ethereum" },
  { symbol: "NASDAQ:TSLA", title: "Tesla" },
  { symbol: "FOREXCOM:EURUSD", title: "EUR/USD" },
];

const TradingViewWidget = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: "NASDAQ:AAPL",
      width: "100%",
      locale: "en",
      colorTheme: "dark",
      isTransparent: false,
    });

    if (widgetRef.current) {
      widgetRef.current.appendChild(script);
    }

    return () => {
      // Cleanup script if component unmounts
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container max-w-max">
      <div
        ref={widgetRef}
        className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TradingViewWidget;
