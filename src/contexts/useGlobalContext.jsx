import { createContext, useState, useEffect } from "react";
import "../api/axiosinstance.config";
import { sumStringsToTwoDecimals } from "../utils/sumStringsToTwoDecimals";
// import useNotification from "../customHooks/useNotification";
import { axiosget, axiospost, axiosput } from "../api/axiosrequest";
import PropTypes from "prop-types";
import { endpoints } from "../api/endpoints";

const GlobalContext = createContext();
const BalanceContext = createContext();
const AddressContext = createContext();

// // Export a custom hook for convenience
// export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [data, setData] = useState([]); // Store data from GET requests
  const [loading, setLoading] = useState(false); // Handle loading states
  const [error, setError] = useState(null); // Handle errors
  // const { onNotify } = useNotification();
  const [btcWallet, setBtcWallet] = useState(
    localStorage.getItem("btcWallet") || ""
  );
  const [ltcWallet, setltcWallet] = useState(
    localStorage.getItem("ltcWallet") || ""
  );
  const [usdtWallet, setUsdtWallet] = useState(
    localStorage.getItem("usdtWallet") || ""
  );
  const [balanceTotal, setBalanceTotal] = useState(
    localStorage.getItem("balanceTotal") || "0.00"
  ); // balance state
  const [balanceUSDT, setBalanceUSDT] = useState(
    localStorage.getItem("USDT") || "0.00"
  ); // balance state
  const [balanceLTC, setBalanceLTC] = useState(
    localStorage.getItem("LTC") || "0.00"
  ); // balance state
  const [balanceBTC, setBalanceBTC] = useState(
    localStorage.getItem("BTC") || "0.00"
  ); // balance state
  const [currentPlans, setCurrentPlans] = useState([]);
  const [totalInterest, setTotalInterest] = useState(0);
  const [currentInvestment, setCurrentInvestment] = useState([]);
  const [verification, setVerification] = useState("");
  const [userData, setUserData] = useState({});
  const [messages, setMessages] = useState([]);
  const [sendStatus, setSendStatus] = useState("");
  // const [loading, setLoading] = useState(false); // Handle loading for messages

  const token = localStorage.getItem("***");

  // Function to fetch chat messages
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const newMessages = await axiosget(endpoints.message.getMessages, token);
      setMessages(newMessages);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Function to send a chat message
  const sendMessage = async (messageText) => {
    try {
      setLoading(true);
      await axiospost(endpoints.message.send, { message: messageText }, token);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: messageText, isOwnMessage: true },
      ]);
      setSendStatus("✔");
      setLoading(false);
    } catch (err) {
      setSendStatus("x");
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(); // Fetch messages on load
  }, []);

  // Function to perform a post req
  const postData = async (urlEndpoint, data) => {
    try {
      setLoading(true);
      const response = await axiospost(urlEndpoint, data, token);
      setLoading(false);

      //   Handle success response if needed
      // onNotify("success", "Successful", "SUCCESFULLY POSTED");
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      // console.error("POST failed:", err.response);
      throw err;
      // return;
    } finally {
      setLoading(false);
    }
  };

  // Function to perform a put req
  const putData = async (urlEndpoint, data) => {
    try {
      setLoading(true);
      const response = await axiosput(urlEndpoint, data, token);
      setLoading(false);

      //   Handle success response if needed
      // onNotify("success", "Successful", "SUCCESFUL UPDATED");
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      // console.error("PUT failed:", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get request and store result in a state
  const fetchData = async (urlEndpoint) => {
    try {
      setLoading(true);
      const response = await axiosget(urlEndpoint, token);
      setLoading(false);
      //   Handle success response if needed
      // onNotify("success", "Successful", "SUCCESSFULLY FETCHED");
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      // console.error("POST failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const newFetchedPlans = await fetchData(endpoints.plans.history);
        const currentPlansArr = [];
        const currentInvestmentArr = [];

        // Parse values once
        const basicInitVal = parseFloat(newFetchedPlans.basic.initialValue);
        const silverInitVal = parseFloat(newFetchedPlans.silver.initialValue);
        const goldInitVal = parseFloat(newFetchedPlans.gold.initialValue);
        const basicInterest = parseFloat(newFetchedPlans.basic.currentInterest);
        const silverInterest = parseFloat(
          newFetchedPlans.silver.currentInterest
        );
        const goldInterest = parseFloat(newFetchedPlans.gold.currentInterest);

        const totalInterestVal = basicInterest + silverInterest + goldInterest;

        if (basicInitVal > 0) {
          currentPlansArr.push("basic");
          currentInvestmentArr.push(basicInitVal);
        }
        if (silverInitVal > 0) {
          currentPlansArr.push("silver");
          currentInvestmentArr.push(silverInitVal);
        }
        if (goldInitVal > 0) {
          currentPlansArr.push("gold");
          currentInvestmentArr.push(goldInitVal);
        }

        setCurrentInvestment(currentInvestmentArr);
        setTotalInterest(totalInterestVal);
        setCurrentPlans(currentPlansArr);
        localStorage.setItem("currentPlans", JSON.stringify(currentPlansArr));
      } catch (err) {
        console.error("Line 185 GlobalContext", err.message);
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    const fetUserData = async () => {
      const fetchedUserData = await fetchData(endpoints.user.get);
      setUserData(fetchedUserData);
    };

    fetUserData();
  }, []);

  useEffect(() => {
    const getVerification = async () => {
      try {
        const response = await fetchData(endpoints.verification.get);
        if (response.verificationStatus !== verification) {
          setVerification(response.verificationStatus);
        }
      } catch (error) {
        console.error(
          "line208 globcont Error fetching verification:",
          error.message
        );
      }
    };

    getVerification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verification]);

  // Read balanceTotal from localStorage
  // Fetch the balance and store it in the context
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const fetchedData = await fetchData(endpoints.wallet.history);
        setData(fetchedData);
        const totalBalance = sumStringsToTwoDecimals(
          fetchedData.USDT,
          fetchedData.LTC,
          fetchedData.BTC
        );
        setBalanceTotal(totalBalance); // Update balance state
        setBalanceUSDT(fetchedData.USDT); // Update balance state
        setBalanceLTC(fetchedData.LTC); // Update balance state
        setBalanceBTC(fetchedData.BTC); // Update balance state
        console.log("235...", fetchedData.USDT)

        localStorage.setItem("balanceTotal", totalBalance);
        localStorage.setItem("USDT", fetchedData.USDT);
        localStorage.setItem("LTC", fetchedData.LTC);
        localStorage.setItem("BTC", fetchedData.BTC);
      } catch (error) {
        console.error("line241 globcon Error fetching balance:", error.message);
      }
    };
    fetchBalance();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balanceTotal, balanceUSDT, balanceLTC, balanceBTC]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const fetchedAddress = await fetchData(endpoints.address);
        setData(fetchedAddress);

        setBtcWallet(fetchedAddress.btcWallet); // Update balance state
        setltcWallet(fetchedAddress.ltcWallet); // Update balance state
        setUsdtWallet(fetchedAddress.usdtWallet); // Update balance state

        localStorage.setItem("usdtWallet", fetchedAddress.usdtWallet);
        localStorage.setItem("ltcWallet", fetchedAddress.ltcWallet);
        localStorage.setItem("btcWallet", fetchedAddress.btcWallet);
      } catch (err) {
        console.error("line 268 useglobcontext", err.message);
      }
    };

    // initial render
    fetchAddress();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Dependency array

  const value = {
    postData,
    fetchData,
    putData,
    data,
    loading,
    setLoading,
    error,
    setData,
    currentPlans,
    totalInterest,
    currentInvestment,
    verification,
    setVerification,
    // setUserData,
    userData,
    messages,
    sendMessage,
    fetchMessages,
    sendStatus,
  };

  const walletAddress = {
    ltcWallet,
    btcWallet,
    usdtWallet,
  };

  const balances = {
    balanceTotal,
    balanceBTC,
    balanceLTC,
    balanceUSDT,
    setBalanceBTC,
    setBalanceLTC,
    setBalanceTotal,
    setBalanceUSDT,
  };

  return (
    <GlobalContext.Provider value={value}>
      <BalanceContext.Provider value={balances}>
        <AddressContext.Provider value={walletAddress}>
          {children}
        </AddressContext.Provider>
      </BalanceContext.Provider>
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContext, BalanceContext, AddressContext };
export default GlobalProvider;
