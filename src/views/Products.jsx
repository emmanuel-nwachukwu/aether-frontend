import NavBar from "../layout/NavBar";
import img1 from "../assets/image1.png";
import img2 from "../assets/image2.png";
import img3 from "../assets/image3.png";
import img4 from "../assets/image4.png";
import img5 from "../assets/image5.png";
import img6 from "../assets/image6.png";
import { ArrowDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Line from "../ui/Line";
import PropTypes from "prop-types";
// import TradingViewWidget from "../ui/TradingViewWidget";
import TradingViewMarketOverview from "../ui/TradingViewMarketOverview";
import Footer from "../layout/Footer";

const sections = [
  {
    title: "CRYPTOCURRENCIES",
    img: img1,
    description:
      "The rise of cryptocurrency trading has had a profound impact on the financial markets. Delve into the realm of crypto and initiate trading with ease on the most sought-after pairs. Providing a wide array of over 60 crypto pairs, our aim is to elevate your trading journey and provide exceptional service.",
  },
  {
    title: "PRECIOUS METALS",
    img: img2,
    description:
      "During periods of economic instability, precious metals are often seen as more secure investment choices. Start your investment venture by examining a wide variety of precious metals, such as gold, silver, diamonds, and various others.",
  },
  {
    title: "FX",
    img: img3,
    description:
      "Engage in currency trading with competitive pricing on a global scale. Take advantage of our extensive selection of FX currency pairs and effortlessly trade currencies like USD/GBP, EUR/AUD, and more with just a single click.",
  },
  {
    title: "SHARES",
    img: img4,
    description:
      "It is advisable to contemplate investing in fractional shares of prominent corporations while leveraging our sophisticated trading instruments to formulate informed predictions about the market.",
  },
  {
    title: "INDICES",
    img: img5,
    description:
      "Are you interested in day trading? Embark on your trading journey by exploring indices and uncovering new markets using innovative strategies.",
  },
  {
    title: "COMMODITIES",
    img: img6,
    description:
      "It is advisable to diversify your financial portfolio by exploring the trading of commodities such as energy, sugar, and coffee in order to uncover fresh avenues for investment.",
  },
];

const Section = ({ title, img, description }) => (
  <div>
    <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
      <h1 className="text-xl font-bold lg:hidden">{title}</h1>
      <div className="overflow-hidden rounded-md max-w-sm h-auto">
        <img src={img} alt={`${title.toLowerCase()} image`} />
      </div>
      <div className="lg:flex flex-col justify-center">
        <h1 className="text-xl font-bold mb-4 hidden lg:flex">{title}</h1>
        <p className="mb-4">{description}</p>
        <Link to="/signup">
          <button className="px-3 py-1 lg:px-8 lg:py-2 lg:font-medium lg:text-2xl rounded-lg border-2 border-green bg-green text-white hover:bg-transparent hover:text-brown">
            Start
          </button>
        </Link>
      </div>
    </div>
    <div className="my-5 lg:my-8">
      <Line />
    </div>
  </div>
);

const Products = () => {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 py-4 mt-8">
        <div className="bg-brown text-white max-w-max mx-auto p-4 lg:p-10 rounded-md flex flex-col gap-y-8 items-center justify-center">
          <p className="text-xs sm:text-sm text-center">
            TRADE WITH OUR TRANSPARENT SERVICES, SECURELY WITH NO HIDDEN FEES.
          </p>
          <p className="text-2xl lg:text-5xl text-center font-bold">
            TRADING PRODUCTS AVAILABLE
          </p>
          <ArrowDownOutlined className="text-4xl" />
        </div>

        <div className="mt-12 lg:mt-24">
          {sections.map((section, index) => (
            <Section
              key={index}
              title={section.title}
              img={section.img}
              description={section.description}
            />
          ))}
        </div>
      </div>
      <div className="bg-brown mt-12 text-white">
        <div className="container mx-auto px-4 py-24 lg:py-48">
          <h1 className="text-center text-2xl lg:text-5xl font-bold mb-4">
            Begin your trading journey the <span>Aether finance</span> way with
            a reliable broker.
          </h1>
          <div className="flex flex-col gap-y-1 lg:flex-row lg:justify-center lg:gap-x-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-xl border flex items-center justify-center">
                ✔
              </span>
              Fast and secure verification system.
            </div>
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-xl border flex items-center justify-center">
                ✔
              </span>
              Optimized and efficient tools.
            </div>
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-xl border flex items-center justify-center">
                ✔
              </span>
              Available 24/7 support team.
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              to="/signup"
              className="px-4 py-2 text-2xl font-semibold lg:px-10 lg:py-3 lg:font-bold lg:text-3xl rounded-lg bg-green text-white hover:bg-green-dark hover:text-white">
              Get Started
            </Link>
          </div>
        </div>
        {/* <div>
          <TradingViewWidget />
        </div> */}
        <div className="container mx-auto mb-24 pb-2">
          <TradingViewMarketOverview />
        </div>
      </div>
      <Footer />
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  img: PropTypes.node,
  description: PropTypes.string,
};

export default Products;
