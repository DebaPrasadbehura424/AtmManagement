import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/other/Home";
import Choose from "./pages/operation/Choose";
import CreateAtm from "./pages/create/CreateAtm";
import Atm from "./pages/create/Atm";
import AadharInput from "./pages/protecter/AadharInput";
import AtmOprations from "./pages/create/AtmOprations";
import BalanaceInquery from "./pages/operation/BalanaceInquery";
import Withdrawal from "./pages/operation/Withdraw";
import Deposit from "./pages/operation/Deposit";
import InsertCard from "./pages/operation/InsertCard";
import Login from "./pages/operation/Login";
import Newpin from "./pages/operation/Newpin";
import FundTransfer from "./pages/operation/FundTransfer";
import ChangePin from "./pages/operation/ChangePin";
import MobileRecharge from "./pages/operation/MobileRecharge";
import TransactionHistory from "./pages/transaction/TrsactionHistory";
import ForgetPassword from "./pages/operation/ForgetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/choose" element={<Choose />} />

      <Route path="/insertcard" element={<InsertCard />} />
      <Route path="/login" element={<Login />} />
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
      <Route path="/createatm" element={<CreateAtm />} />
      <Route path="/atmopration" element={<AtmOprations />} />

      <Route path="/aadharInput" element={<AadharInput />} />
    </Routes>
  );
}

export default App;
