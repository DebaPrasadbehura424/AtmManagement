import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/main/Home";
import Atm from "./pages/create/Atm";
import AtmOprations from "./pages/create/AtmOprations";
import TransactionHistory from "./pages/transaction/TrsactionHistory";
import Bank from "./pages/main/Bank";
import MayIHelpYou from "./pages/main/MayIHelpYou";
import AccountPage from "./pages/operation/AccountPage";
import AtmHome from "./pages/operation/AtmHome";
import Cashier from "./pages/main/Cashier";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* bank  */}
      <Route path="/bank" element={<Bank />} />
      <Route path="/MAY I HELP YOU?" element={<MayIHelpYou />} />
      <Route path="/CASHIER" element={<Cashier/>} />
      <Route path="/accountPage" element={<AccountPage />} />

      {/* atm */}
      <Route path="/atm_home" element={<AtmHome />} />

      <Route path="/trasanction" element={<TransactionHistory />} />

      <Route path="/atm" element={<Atm />} />
      <Route path="/atmopration" element={<AtmOprations />} />
    </Routes>
  );
}

export default App;
