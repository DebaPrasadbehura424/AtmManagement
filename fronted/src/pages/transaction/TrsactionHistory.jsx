import React, { useState, useEffect } from "react";
import axios from "axios";
import atmback from "../utils/atmimg.jpg";

function TransactionHistory(props) {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/History/${token}`
        );
        if (response.status === 200) {
          setTransactions(response.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    if (token) {
      fetchTransactions();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <div className="absolute inset-0">
        <img
          src={atmback}
          alt="ATM Background"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-[#7E7D7F] rounded-lg w-[30%] z-10 mr-61 mb-30">
        <div className="trans max-h-72 overflow-y-auto p-2 scrollbar-hide">
          {transactions.length === 0 ? (
            <p className="text-center text-white">No transactions found.</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2 text-sm font-medium text-blue-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-4 py-2 text-sm font-medium text-blue-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left px-4 py-2 text-sm font-medium text-blue-700 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: transactions.length }).map((_, index) => {
                  const reversedIndex = transactions.length - 1 - index;
                  const transaction = transactions[reversedIndex];
                  return (
                    <tr
                      key={reversedIndex}
                      // className={
                      //   index % 2 === 0 ? "bg-[#4E4E50]" : "bg-[#59585C"
                      // }
                    >
                      <td className="px-4 py-2 text-sm text-white">
                        {transaction.trasactionType}
                      </td>
                      <td className="px-4 py-2 text-sm text-white">
                        {transaction.trasanctions}
                      </td>
                      <td className="px-4 py-2 text-sm text-white">
                        {new Date(transaction.data).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
