import { Link } from "react-router-dom";
import NavBar from "../layout/NavBar";
import "../index.css";
import CryptoTicker from "../ui/CryptoTicker";
import TradingViewTicker from "../ui/TradingViewTicker";
import { Collapse } from "antd";
// import CoinMarketCapTicker from "../ui/CoinMarketCapTicker";
import img1 from "../assets/image1.png";
import img2 from "../assets/image2.png";
import img3 from "../assets/image3.png";
import img4 from "../assets/image4.png";
import img5 from "../assets/image5.png";
import img6 from "../assets/image6.png";
import { useState } from "react";
import Footer from "../layout/Footer";

const Home = () => {
  const { Panel } = Collapse;
  const [activeKey, setActiveKey] = useState([]);

  const handleChange = (key) => {
    setActiveKey(key);
  };


  return (
    <div className="pb-4">
      <NavBar />
      <div className="mt-10 md:mt-16 lg:mt-32">
        <section className="container mx-auto px-4">
          <div className="max-w-[700px] w-full flex flex-col gap-y-4 text-2xl font-bold">
            <h1 className="text-3xl sm:text-4xl md:text-6xl">
              Grow your capital with our bots automatically investing in{" "}
              <span className="text-3xl text-brown">forex</span> and{" "}
              <span className="text-3xl text-brown">crypto</span> markets
            </h1>
            <div>
              <p className="text-sm">Secure and easy way to trade.</p>
              <p className="text-sm">
                150.000+ traders using aether Automated investment bots.
              </p>
            </div>
            <Link to="/signup" className="my-8">
              <button className="px-8 py-2 bg-brown text-white rounded hover:bg-brown-dark">
                Join Us
              </button>
            </Link>
          </div>
        </section>
        <div className="my-4 relative">
          <CryptoTicker />
        </div>
        <div className="mb-12 relative">
          <TradingViewTicker />
        </div>
        <section className="container mx-auto  px-4 flex flex-wrap justify-center gap-6">
          <Link
            to="/plans"
            className="flex-1 bg-black hover:bg-black-light hover:text-brown-light text-white p-4 rounded-md min-w-[200px] cursor-pointer">
            <h1 className="text-3xl font-medium mb-6">
              Top-notch customer service
            </h1>
            <p>
              Feel confident when engaging in trading, as your transactions take
              place solely on specialized, high-speed, and highly secure
              servers.
            </p>
          </Link>
          <Link
            to="/plans"
            className="flex-1 bg-green-dark hover:bg-green hover:text-brown-dark text-white p-4 rounded-md min-w-[200px] cursor-pointer">
            <h1 className="text-3xl font-medium mb-6">Short-Term Contracts</h1>
            <p>
              Trading intra-day, daily or weekly provides unique opportunities.
            </p>
          </Link>
          <Link
            to="/plans"
            className="flex-1 bg-black hover:bg-black-light hover:text-brown-light text-white p-4 rounded-md min-w-[200px] cursor-pointer">
            <h1 className="text-3xl font-medium mb-6">Active Markets</h1>
            <p>24 hours a day, Sunday-Friday. Whenever you want to trade.</p>
          </Link>
          <Link
            to="/plans"
            className="flex-1 bg-green-dark hover:bg-green hover:text-brown-dark text-white p-4 rounded-md min-w-[200px] max-w-[400px] min-h-[180px] cursor-pointer">
            <h1 className="text-3xl font-medium mb-6">Risk That You Define</h1>
            <p>Know your maximum potential profit or loss up front.</p>
          </Link>
        </section>
        <section className="bg-brown my-12 text-white">
          <div className="container mx-auto px-4 py-8 bg-brown flex gap-6">
            <div className="text-3xl flex-basis-1/4">
              RELIABLE AND SWIFT PROTECTED SWIFT EXECUTIONS.
            </div>
            <div className="flex flex-col items-center flex-basis-3/4">
              <p>
                Engage in trading with assurance, as your transactions are both
                secure and swift. Say goodbye to missed opportunities caused by
                delays. Every transaction is carried out on specialized,
                high-speed, and heavily encrypted servers.
              </p>
              <Link to="/signup" className="my-8">
                <button className="px-8 py-2 bg-green-dark text-white text-xl font-medium rounded hover:bg-green">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <section className="container mx-auto px-4 flex flex-col gap-1 mb-12">
        <h1 className="text-center text-5xl font-medium">
          MT4-Trading platforms
        </h1>
        <p className="text-md mb-6">
          Access global markets anytime and anywhere with ease. Utilize the
          world&apos;s most renowned trading platform, MT4, to engage in trading
          various instruments across different markets worldwide.
        </p>
        <div className="flex flex-wrap justify-evenly gap-6 ">
          <div className="flex flex-col gap-1 max-w-72 lg:max-w-sm p-4 rounded-lg bg-white hover:bg-brown-light transition-all ease-in-out duration-500">
            <span className="mb-4 text-xl font-medium">Cryptocurrencies</span>
            <div className="overflow-hidden rounded-md max-w-sm h-auto">
              <img src={img1} alt="cryptocurrencies image" />
            </div>
            <span>Say godbye to missed chances caused by delays.</span>
            <Link to="/product" className="">
              <button className="px-2 py-1 bg-green-dark text-white rounded hover:bg-green">
                Learn more
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-1 max-w-72 lg:max-w-sm p-4 rounded-lg bg-white hover:bg-brown-light transition-all ease-in-out duration-500">
            <span className="mb-4 text-xl font-medium">Precious Metals</span>
            <div className="overflow-hidden rounded-md max-w-sm h-auto">
              <img src={img2} alt="Precious Metals image" />
            </div>
            <span>
              Examine a wide variety of precious metals such as gold, diamonds,
              etc.
            </span>
            <Link to="/product" className="">
              <button className="px-2 py-1 bg-green-dark text-white rounded hover:bg-green">
                Learn more
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-1 max-w-72 lg:max-w-sm p-4 rounded-lg bg-white hover:bg-brown-light transition-all ease-in-out duration-500">
            <span className="mb-4 text-xl font-medium">Stocks</span>
            <div className="overflow-hidden rounded-md max-w-sm h-auto">
              <img src={img3} alt="Stocks image" />
            </div>
            <span>Never Lose an opportunity due to latency issues again.</span>
            <Link to="/product" className="">
              <button className="px-2 py-1 bg-green-dark text-white rounded hover:bg-green">
                Learn more
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-1 max-w-72 lg:max-w-sm p-4 rounded-lg bg-white hover:bg-brown-light transition-all ease-in-out duration-500">
            <span className="mb-4 text-xl font-medium">Commodities</span>
            <div className="overflow-hidden rounded-md max-w-sm h-auto">
              <img src={img4} alt="commodities image" />
            </div>
            <span>
              Delve into trading of commodities like coffee, to find new
              investment chances.
            </span>
            <Link to="/product" className="">
              <button className="px-2 py-1 bg-green-dark text-white rounded hover:bg-green">
                Learn more
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-1 max-w-72 lg:max-w-sm p-4 rounded-lg bg-white hover:bg-brown-light transition-all ease-in-out duration-500">
            <span className="mb-4 text-xl font-medium">Shares</span>
            <div className="overflow-hidden rounded-md max-w-sm h-auto">
              <img src={img5} alt="Shares image" />
            </div>
            <span>Invest in fractional shares of well known companies.</span>
            <Link to="/product" className="">
              <button className="px-2 py-1 bg-green-dark text-white rounded hover:bg-green">
                Learn more
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-1 max-w-72 lg:max-w-sm p-4 rounded-lg bg-white hover:bg-brown-light transition-all ease-in-out duration-500">
            <span className="mb-4 text-xl font-medium">Indices</span>
            <div className="overflow-hidden rounded-md max-w-sm h-auto">
              <img src={img6} alt="Indices image" />
            </div>
            <span>
              Explore indices and uncover new market using innovative
              strategies.
            </span>
            <Link to="/product" className="">
              <button className="px-2 py-1 bg-green-dark text-white rounded hover:bg-green">
                Learn more
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 flex flex-wrap justify-center gap-4 mb-12">
        <div className="flex flex-col items-center gap-4 max-w-44 pt-6 need-help">
          <h2 className="text-2xl font-medium">Need help?</h2>
          <Link to="/signin" className="">
            <button className="px-3 py-1  rounded-lg border-2 border-green hover:bg-green hover:text-white">
              Contact Us
            </button>
          </Link>
        </div>
        <div className="flex-1 p-4 min-w-[400px]">
          <Collapse
            ghost
            activeKey={activeKey}
            onChange={handleChange}
            expandIcon={({ isActive }) => (isActive ? "-" : "+")} // Customize the icons
            expandIconPosition="end">
            <Panel
              header="Exceptional Security"
              key="1"
              className={`text-lg font-bold ${
                activeKey.includes("1") ? "bg-white" : ""
              }`}>
              <ul className="list-square pl-6 text-sm font-medium">
                <li>
                  Combining Speed of transaction and execution with top-level
                  security, the best security for your assets is implemented for
                  your peace of mind.
                </li>
                <li>
                  Our advanced encryption protocols and multi-layered security
                  systems ensure your assets remain safe from unauthorized
                  access. We employ industry-leading measures, including
                  two-factor authentication (2FA) and real-time fraud
                  monitoring, to keep your transactions and accounts secure.
                  Experience trading with the confidence that your financial
                  data is in trusted hands.
                </li>
              </ul>
            </Panel>
            <Panel
              header="Expert Market Analysis"
              key="2"
              className={`text-lg font-bold ${
                activeKey.includes("2") ? "bg-white" : ""
              }`}>
              <ul className="list-square pl-6 text-sm font-medium">
                <li>
                  Leverage expert insights and in-depth market analysis to stay
                  ahead in a fast-paced trading environment.
                </li>
                <li>
                  With our team of seasoned market analysts, you receive
                  actionable insights, detailed reports, and real-time updates
                  tailored to your portfolio. Gain access to trend forecasts,
                  investment opportunities, and tools to make informed decisions
                  in any market condition. Whether you&apos;re a novice or a
                  seasoned trader, our insights empower you to trade with
                  precision.
                </li>
              </ul>
            </Panel>
            <Panel
              header="Seamless Account Management"
              key="3"
              className={`text-lg font-bold ${
                activeKey.includes("3") ? "bg-white" : ""
              }`}>
              <ul className="list-square pl-6 text-sm font-medium">
                <li>
                  Effortlessly handle your investments and transactions with an
                  intuitive and user-friendly platform.
                </li>
                <li>
                  Enjoy full control over your trading activities with a
                  centralized dashboard designed for simplicity and efficiency.
                  Manage deposits, withdrawals, trade history, and account
                  preferences in one place. Our seamless integration ensures
                  that every feature is easily accessible, allowing you to focus
                  on maximizing returns without unnecessary complexity.
                </li>
              </ul>
            </Panel>
            <Panel
              header="Educational Resources"
              key="4"
              className={`text-lg font-bold ${
                activeKey.includes("4") ? "bg-white" : ""
              }`}>
              <ul className="list-square pl-6 text-sm font-medium">
                <li>
                  Unlock your potential with comprehensive resources tailored to
                  enhance your trading knowledge.
                </li>
                <li>
                  Whether you&apos;re just starting or looking to refine your
                  skills, our educational resources are designed to meet your
                  needs. Access interactive tutorials, webinars, and in-depth
                  guides curated by industry experts. Stay updated with the
                  latest trends and strategies to grow your knowledge and
                  confidence in the world of trading.
                </li>
              </ul>
            </Panel>
            <Panel
              header="Personalized Support"
              key="5"
              className={`text-lg font-bold ${
                activeKey.includes("5") ? "bg-white" : ""
              }`}>
              <ul className="list-square pl-6 text-sm font-medium">
                <li>
                  Receive dedicated assistance tailored to your unique needs and
                  trading goals
                </li>
                <li>
                  Our team of expert advisors and customer service
                  representatives is available 24/7 to provide personalized
                  support. From onboarding to resolving queries, we prioritize
                  your satisfaction. Enjoy seamless communication through chat,
                  email, or phone, ensuring your experience is smooth and
                  tailored to your expectations.
                </li>
              </ul>
            </Panel>
          </Collapse>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
