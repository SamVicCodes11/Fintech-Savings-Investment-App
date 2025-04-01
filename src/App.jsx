import React from "react";
import { GlobalStateProvider } from "./context/GlobalState";
import BalanceCard from "./components/BalanceCard";
import QuickActions from "./components/QuickActions";
import Transactions from "./components/Transactions";
import InvestmentChart from "./components/InvestmentChart";
import { ToastContainer } from "react-toastify"; // Import ToastContainer

function App() {
  return (
    <GlobalStateProvider>
      <div className="container mx-auto p-4">
        <ToastContainer position="top-right" autoClose={3000} /> {/* ✅ Add Toasts */}
        <BalanceCard />
        <QuickActions />
        <Transactions />
        <InvestmentChart />
      </div>
    </GlobalStateProvider>
  );
}

export default App;
