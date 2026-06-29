import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import bankIcon from "./pages/utils/banklogo.png";

createRoot(document.getElementById("root")).render(
  // <StrictMode>

  <BrowserRouter>
    <App />
    <link rel="icon" type="image" href={bankIcon} />
  </BrowserRouter>

  // </StrictMode>
);
