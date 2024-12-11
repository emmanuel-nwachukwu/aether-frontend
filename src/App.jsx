import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import About from "./views/About";
import Products from "./views/Products";
import PlansHome from "./views/PlansHome";
import { App as AntdApp } from "antd";
import DashboardLayout from "./views/DashboardLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import UnprotectedRoutes from "./UnprotectedRotes";
import AdminProtectedRoutes from "./views/AdminProtectedRoutes";
import AdminDashboard from "./views/AdminDashboard";
import AdminSettings from "./views/AdminSettings";
import AdminSignIn from "./views/AdminSignIn";
import Plans from "./layout/Plans";
import Transaction from "./layout/Transaction";
import Wallet from "./layout/Wallet";
import Verification from "./layout/Verification";
import Profile from "./layout/Profile";
import Chat from "./layout/Chat";
import Logout from "./layout/Logout";
import DashboardContent from "./layout/DashboardContent";
import PlanSelect from "./layout/PlanSelect";
import Withdraw from "./layout/Withdraw";
import Deposit from "./layout/Deposit";
import GlobalProvider from "./contexts/useGlobalContext";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <UnprotectedRoutes>
          <Home />
        </UnprotectedRoutes>
      ),
    },
    {
      path: "/signup",
      element: (
        <UnprotectedRoutes>
          <SignUp />
        </UnprotectedRoutes>
      ),
    },
    {
      path: "/signin",
      element: (
        <UnprotectedRoutes>
          <SignIn />
        </UnprotectedRoutes>
      ),
    },
    {
      path: "/about",
      element: (
        <UnprotectedRoutes>
          <About />
        </UnprotectedRoutes>
      ),
    },
    {
      path: "/plans",
      element: (
        <UnprotectedRoutes>
          <PlansHome />
        </UnprotectedRoutes>
      ),
    },
    {
      path: "/product",
      element: (
        <UnprotectedRoutes>
          <Products />
        </UnprotectedRoutes>
      ),
    },
    {
      path: "/user",
      // Component: Dashboard,
      element: (
        <ProtectedRoutes>
          <GlobalProvider>
            <DashboardLayout />
          </GlobalProvider>
        </ProtectedRoutes>
      ),
      children: [
        {
          path: "dashboard",
          element: <DashboardContent />,
        },
        {
          path: "plans",
          element: <Plans />,
        },
        {
          path: "plans/select", // Make PlanSelect a sibling route of Plans
          element: <PlanSelect />,
        },
        {
          path: "transactions",
          element: <Transaction />,
        },
        {
          path: "wallet",
          element: <Wallet />,
        },
        {
          path: "wallet/deposit",
          element: <Deposit />,
        },
        {
          path: "wallet/withdraw",
          element: <Withdraw />,
        },
        {
          path: "verification",
          element: <Verification />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "chat",
          element: <Chat />,
        },
        {
          path: "logout",
          element: <Logout />,
        },
      ],
    },
    {
      path: "/admin/signin",
      element: (
        <UnprotectedRoutes>
          <AdminSignIn />
        </UnprotectedRoutes>
      ),
    },
    {
      path: "/admin/dashboard",
      element: (
        <AdminProtectedRoutes>
          <GlobalProvider>
            <AdminDashboard />
          </GlobalProvider>
        </AdminProtectedRoutes>
      ),
    },
    {
      path: "/admin/settings",
      Component: AdminSettings,
    },
  ]);
  return (
    <AntdApp>
      <RouterProvider router={router} />
    </AntdApp>
  );
};

export default App;
