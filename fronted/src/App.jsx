import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/main/Home";
import Choose from "./pages/operation/Choose";
import Atm from "./pages/create/Atm";
import AtmOprations from "./pages/create/AtmOprations";
import BalanaceInquery from "./pages/operation/BalanaceInquery";
import Withdrawal from "./pages/operation/Withdraw";
import Deposit from "./pages/operation/Deposit";
import Login from "./pages/operation/AtmHome";
import Newpin from "./pages/operation/Newpin";
import FundTransfer from "./pages/operation/FundTransfer";
import ChangePin from "./pages/operation/ChangePin";
import MobileRecharge from "./pages/operation/MobileRecharge";
import TransactionHistory from "./pages/transaction/TrsactionHistory";
import ForgetPassword from "./pages/operation/ForgetPassword";
import Bank from "./pages/main/Bank";
import Cashier from "./pages/main/MayIHelpYou";
import AccountPage from "./pages/operation/AccountPage";
import AtmHome from "./pages/operation/AtmHome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* bank  */}
      <Route path="/bank" element={<Bank />} />
      <Route path="/MAY I HELP YOU?" element={<Cashier />} />
      <Route path="/accountPage" element={<AccountPage />} />
      <Route path="/choose" element={<Choose />} />

      {/* atm */}
      <Route path="/atm_home" element={<AtmHome />} />
      <Route path="/newpin" element={<Newpin />} />
      <Route path="/balanceInquery" element={<BalanaceInquery />} />
      <Route path="/withdraw" element={<Withdrawal />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/fund" element={<FundTransfer />} />
      <Route path="/changepin" element={<ChangePin />} />
      <Route path="/mobileRecharge" element={<MobileRecharge />} />
      <Route path="/trasanction" element={<TransactionHistory />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />

      <Route path="/atm" element={<Atm />} />
      <Route path="/atmopration" element={<AtmOprations />} />
    </Routes>
  );
}

export default App;
