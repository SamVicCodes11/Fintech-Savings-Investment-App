import { FiDollarSign } from "react-icons/fi";
import { useGlobalState } from "../context/GlobalState";

const BalanceCard = () => {
  const { balance, loading, error } = useGlobalState();

  if (loading) {
    return <p className="text-center text-gray-600">Loading balance...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
      <div className="bg-green-500 text-white p-3 rounded-full mb-4">
        <FiDollarSign size={24} />
      </div>
      <h2 className="text-lg font-semibold text-gray-700">Total Balance</h2>
      <p className="text-2xl font-bold text-gray-900">${balance.toFixed(2)}</p>
      <span className="text-green-500 text-sm">+5.4% from last month</span>
    </div>
  );
};

export default BalanceCard;
