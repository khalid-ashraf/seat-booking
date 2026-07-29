import { getTotalPrice } from "./seatUtils";

const Summary = ({
  selectedSeats,
  currency,
  onReset,
  onBookNow,
}) => {
  const totalPrice = getTotalPrice(selectedSeats);
  const hasSelection = selectedSeats.length > 0;

  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
      <div>
        <h3 className="text-lg font-bold text-gray-800">Summary</h3>
        <p className="text-sm text-gray-600">
          Selected Seats: {selectedSeats.length}
        </p>
        <p className="text-lg font-bold text-green-600">
          Total Price: {currency}
          {totalPrice}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onReset}
          disabled={!hasSelection}
          className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onBookNow}
          disabled={!hasSelection}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Summary;
