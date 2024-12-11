import Footer from "../layout/Footer";
import NavBar from "../layout/NavBar";
import widget from "../assets/about-widget.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <NavBar />
      <div
        className="h-40 sm:h-60 md:h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${widget})` }}></div>
      <div className="container mx-auto mt-12 mb-72 px-4">
        <h1 className="text-center text-green font-bold text-3xl sm:text-5xl  lg:text-7xl mb-4">
          ABOUT AETHER FINANCE
        </h1>
        <p className="font-semibold md:text-xl mb-4">
          Here at Aether Finance, we have developed a trading platform focused
          on security, speed, and advanced tools to optimize your trading
          experience. With a carefully curated selection of trading instruments,
          our platform supports a wide range of markets, providing expert
          support at every step.{" "}
        </p>
        <p className="font-semibold md:text-xl mb-8">
          We prioritize efficient execution, easy access, fast withdrawals, and
          diverse deposit options. Aether Finance is committed to delivering
          tailored solutions that meet the unique needs of each client,
          continuously improving by incorporating user feedback and introducing
          new features. Your satisfaction and success in the financial markets
          are our top priority.
        </p>
        <div className="text-center">
          <Link
            to="/signin"
            className="bg-green hover:bg-green-dark text-white hover:text-white font-semibold md:font-bold md:text-2xl py-2 px-6 rounded">
            Start Trading Now
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
