import Footer from "../layout/Footer";
import NavBar from "../layout/NavBar";
import ResponsiveTable from "../layout/ResponsiveTable";

const PlansHome = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <h1 className="text-center text-5xl sm:text-7xl font-bold mt-10">Plans</h1>
      <div className="mb-16 mt-10">
        <ResponsiveTable />
      </div>
      <div className="mt-24 sm:mt-48">
        <Footer />
      </div>
    </div>
  );
};

export default PlansHome;
