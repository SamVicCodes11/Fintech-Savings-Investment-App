import { useState } from "react";
import { useGlobalState } from "../context/GlobalState";
import TransactionModal from "../components/TransactionModal";
import { toast } from "react-toastify";

const QuickActions = () => {
  const { balance, deposit, withdraw } = useGlobalState();
  const [modalOpen, setModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");

  // Open the modal and set transaction type
  const handleTransaction = (type) => {
    setTransactionType(type);
    setTransactionAmount("");
    setModalOpen(true);
  };

  // Confirm the transaction
  const confirmTransaction = () => {
    const amount = parseFloat(transactionAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Invalid amount. Please enter a valid number.");
      return;
    }

    if (transactionType === "withdrawal" && amount > balance) {
      toast.error("Insufficient balance! Please enter a lower amount.");
      return;
    }

    transactionType === "deposit" ? deposit(amount) : withdraw(amount);

    toast.success(
      `${
        transactionType.charAt(0).toUpperCase() + transactionType.slice(1)
      } successful!`
    );
    setModalOpen(false);
  };

  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => handleTransaction("deposit")}
        className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition"
      >
        Deposit
      </button>
      <button
        onClick={() => handleTransaction("withdrawal")}
        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
      >
        Withdraw
      </button>

      {/* Confirmation Modal */}
      <TransactionModal
        isOpen={modalOpen}
        type={transactionType}
        setAmount={setTransactionAmount}
        onConfirm={confirmTransaction}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};

export default QuickActions;
