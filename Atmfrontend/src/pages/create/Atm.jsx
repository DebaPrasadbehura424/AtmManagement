import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import Swal for alerts
import axios from "axios";
import fail from "../audios/fail.mp3";
import success from "../audios/success.mp3";
import { useNavigate } from "react-router-dom";

function Atm() {
  const [userData, setUserData] = useState(null);
  const [aadharNumber, setAadharNumber] = useState(
    localStorage.getItem("aadharNum")
  );
  const [error, setError] = useState("");
  const navigate = useNavigate(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!aadharNumber) {
        setError("Aadhar number is required.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/user/aadharNumber/${aadharNumber}`
        );

        if (response.status === 200) {
          new Audio(success).play();
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Aadhar Clarification Successful!",
            confirmButtonColor: "#3085d6",
          }).then(() => {
            setUserData(response.data);
          });
        } else {
          new Audio(fail).play();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Aadhar number. Please check with the bank.",
          });
        }
      } catch (error) {
        new Audio(fail).play();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred. Please try again later.",
        });
      }
    };

    fetchData();
  }, [aadharNumber]);

  const handleSendEmail = async () => {
    if (!userData) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User data is not available. Please try again later.",
      });
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ATM Email</title>
        <style>
          body {
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(to right, #ff7e5f, #feb47b);
            padding: 20px;
            color: white;
          }
          .card {
            background: linear-gradient(to right, #6a11cb, #2575fc);
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            padding: 30px;
            max-width: 500px;
            margin: 0 auto;
            position: relative;
          }
          .card::before {
            content: "";
            position: absolute;
            top: -20px;
            left: -20px;
            right: -20px;
            bottom: -20px;
            border: 2px solid #fff;
            border-radius: 14px;
            z-index: -1;
            background: rgba(255, 255, 255, 0.1);
          }
          .account-number {
            font-family: 'Courier New', Courier, monospace;
            color: #ffffff;
            font-size: 28px;
            letter-spacing: 2px;
            margin-top: 20px;
            text-align: center;
          }
          .heads{
            color: #ff0000;
            font-size: 20px;
            margin-top: 5px;
            text-align: center;
            }
          .user-info {
            color: #ffffff;
            font-size: 20px;
            margin-top: 20px;
            text-align: center;
          }
          .date {
            color: #ffffff;
            font-size: 18px;
            text-align: center;
            margin-top: 10px;
            font-style: italic;
          }
          .footer {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(to right, #ff7e5f, #feb47b);
            border-radius: 0 0 12px 12px;
          }
        </style>
      </head>
      <body>
        <div class="card">
           <h3 class="heads">SCOTIA BANK ATM</h3>


          <div class="account-number">
            ${userData.accountNumber.substring(
              0,
              4
            )} ${userData.accountNumber.substring(
      4,
      8
    )} ${userData.accountNumber.substring(
      8,
      12
    )} ${userData.accountNumber.substring(12, 16)}
          </div>
          <div class="user-info">
            ${userData.firstName} ${userData.lastName}
          </div>
          <div class="date">
            Created At: ${userData.creationDateTime.substring(0, 10)}
          </div>
          <div class="footer"></div>
        </div>
      </body>
      </html>
    `;

    try {
      const emailData = {
        to: userData.email,
        subject: "ATM Card Information",
        body: htmlContent,
      };

      const response = await axios
        .post("http://localhost:8080/api/email/send", emailData)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Email Sent",
              text: "The email has been sent successfully!",
            });
            navigate("/login");
          }
        });
    } catch (error) {
      console.error("Error sending email:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Send Email",
        text: "There was an error sending the email. Please try again later.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={handleSendEmail}
        disabled={!userData}
        className="bg-gradient-to-r from-green-400
         to-blue-500 text-white py-6 px-10 rounded-xl shadow-xl
          hover:from-blue-500 hover:to-green-400 text-3xl font-semibold 
          transform transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
      >
        Send Email
      </button>
    </div>
  );
}

export default Atm;
