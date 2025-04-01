import { useGlobalState } from "../context/GlobalState";

const Transactions = () => {
  const { transactions } = useGlobalState();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-sm">No transactions yet.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((txn) => (
            <li
              key={txn.id}
              className={`flex justify-between p-3 rounded-md ${
                txn.type === "deposit" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <span className="text-gray-700">{txn.date}</span>
              <span className="font-medium">{txn.type === "deposit" ? "+" : "-"}${txn.amount}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;
