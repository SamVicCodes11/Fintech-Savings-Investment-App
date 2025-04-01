
const TransactionModal = ({ isOpen, type, onConfirm, onCancel, setAmount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-80 text-center">
        <h2 className="text-lg font-semibold">
          Confirm {type.charAt(0).toUpperCase() + type.slice(1)}
        </h2>
        <input
          type="number"
          placeholder="Enter amount"
          className="border rounded px-2 py-1 w-full mt-3 mb-3"
          onChange={(e) => setAmount(parseFloat(e.target.value) || "")} // Ensures it's a number
        />
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
