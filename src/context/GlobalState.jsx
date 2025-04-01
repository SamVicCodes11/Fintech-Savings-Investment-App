import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchData } from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [investmentData, setInvestmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchData();
        if (
          data &&
          data.balance !== undefined &&
          data.transactions !== undefined
        ) {
          setBalance(data.balance);
          setTransactions(data.transactions);
          setInvestmentData(data.investmentData || []);
        } else {
          throw new Error("Incomplete data from the API");
        }
      } catch (err) {
        setError("Failed to load data. Please try again.");
        toast.error("🚨 Failed to load data! Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle Deposit
  const deposit = (amount) => {
    if (amount <= 0) {
      toast.warning("⚠️ Enter a valid amount!");
      return;
    }

    const newTransaction = {
      id: Date.now(), // Unique ID based on timestamp
      type: "deposit",
      amount,
      date: new Date().toISOString().split("T")[0],
    };

    setBalance((prev) => prev + amount);
    setTransactions((prev) => [newTransaction, ...prev]);

    toast.success(`✅ Deposit of $${amount} successful!`);
  };

  // Handle Withdrawal
  const withdraw = (amount) => {
    if (amount <= 0) {
      toast.warning("⚠️ Enter a valid amount!");
      return;
    }

    if (amount > balance) {
      toast.error("❌ Insufficient balance!");
      return;
    }

    const newTransaction = {
      id: Date.now(), // Unique ID based on timestamp
      type: "withdrawal",
      amount,
      date: new Date().toISOString().split("T")[0],
    };

    setBalance((prev) => prev - amount);
    setTransactions((prev) => [newTransaction, ...prev]);

    toast.success(`💸 Withdrawal of $${amount} successful!`);
  };

  return (
    <GlobalStateContext.Provider
      value={{
        balance,
        transactions,
        investmentData,
        deposit,
        withdraw,
        loading,
        error,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
