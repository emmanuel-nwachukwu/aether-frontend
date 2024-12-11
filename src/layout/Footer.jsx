import { Link } from "react-router-dom";
import footerLogo from "../assets/colored-no-bg.png";


const Footer = () => {
  return (
    <footer className="container mx-auto px-4 py-4">
      <Link
        to="/"
        className="flex items-center font-bold text-xl text-brown hover:text-brown-dark mb-6">
        <div className="w-10">
          <img src={footerLogo} alt="footer-logo" />
        </div>
        Aether Finance
      </Link>

      <div className="mb-6">
        Trading involves a substantial risk of incurring rapid financial losses
        due to the utilization of leverage. It is imperative to acknowledge that
        75% of individual investors experience monetary losses during their
        trading activities. Prior to commencing any trading endeavors, it is
        essential to acquire a comprehensive comprehension of its mechanisms and
        evaluate whether you possess the financial capacity to withstand
        potential losses. Being cognizant of all the risks associated with
        trading and our diverse range of products is of utmost importance. In
        case of uncertainty, seeking guidance from an impartial advisor is
        always advisable. It is crucial to remember that previous performance
        does not guarantee future outcomes.
      </div>

      <div className="flex flex-wrap items-center justify-between min-w-[215px] gap-2">
        <div>Copyright &copy; 2024 Aether Finance</div>
        <Link to="/" className="min-w-[112px] text-brown hover:text-brown-dark">
          Legal Documents
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
