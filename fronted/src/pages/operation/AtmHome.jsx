import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AtmHome() {
  const navigate = useNavigate();

  const handleIssueCard = () => {
    Swal.fire({
      icon: "success",
      title: "ATM Card Issued Successfully!",
      text: "Card details have been sent to your registered email.",
      confirmButtonColor: "#10b981",
    }).then(() => {
      navigate("/login");
    });
  };

  return <></>;
}

export default AtmHome;
