const BookingToast = ({ message = "Seats booked" }) => (
  <div
    role="status"
    className="fixed bottom-4 right-4 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-lg"
  >
    {message}
  </div>
);

export default BookingToast;
