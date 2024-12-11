import { useEffect } from "react";

const TradingViewTicker = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "BITSTAMP:BTCUSD", title: "BTC/USD" },
        { proName: "BITSTAMP:ETHUSD", title: "ETH/USD" },
        { proName: "BINANCE:BNBUSDT", title: "BNB/USDT" },
        { proName: "COINBASE:SOLUSD", title: "SOL/USD" },
        { proName: "BINANCE:ADAUSDT", title: "ADA/USDT" },
      ],
      colorTheme: "light",
      isTransparent: false,
      displayMode: "adaptive",
      locale: "en",
    });
    document.getElementById("tradingview-widget").appendChild(script);
  }, []);

  return <div id="tradingview-widget" className="w-full h-16"></div>;
};

export default TradingViewTicker;
