import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <div className="bg-gradient-to-br from-white to-brown-light min-h-screen h-full text-white transition-bg duration-2000 ease-in-out hover:bg-gradient-to-bl hover:from-brown-light hover:to-white"> */}
    <App />
    {/* </div> */}
  </StrictMode>
);
