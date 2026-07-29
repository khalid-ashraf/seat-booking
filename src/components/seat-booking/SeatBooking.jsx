import { useState, useMemo } from "react";

import BookingTitle from "./BookingTitle";
import Screen from "./Screen";
import SeatMap from "./SeatMap";
import Legend from "./Legend";
import Summary from "./Summary";
import BookingToast from "./BookingToast";

import { DEFAULT_LAYOUT, DEFAULT_SEAT_TYPES } from "./constants";
import {
  createSeatGrid,
  getUniqueSeatTypes,
  toggleSeatInGrid,
  clearSelectedSeats,
} from "./seatUtils";

const SeatBooking = ({
  layout = DEFAULT_LAYOUT,
  seatTypes = DEFAULT_SEAT_TYPES,
  bookedSeats = [],
  currency = "$",
  onBookingComplete = () => {},
  title = "Imax",
  subTitle = "Odessey Movie",
}) => {
  const initialSeats = useMemo(
    () => createSeatGrid(layout, seatTypes, bookedSeats),
    [layout, seatTypes, bookedSeats],
  );

  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showBookingToast, setShowBookingToast] = useState(false);

  const uniqueSeatTypes = useMemo(() => getUniqueSeatTypes(seatTypes), [seatTypes]);

  const handleSeatClick = (rowIndex, seatIndex) => {
    const seat = seats[rowIndex][seatIndex];
    if (seat.status === "booked") return;

    const isCurrentlySelected = seat.selected;

    setSeats(prevSeats => toggleSeatInGrid(prevSeats, rowIndex, seatIndex));

    setSelectedSeats(prev =>
      isCurrentlySelected ? prev.filter(s => s.id !== seat.id) : [...prev, seat],
    );
  };

  const handleReset = () => {
    setSelectedSeats([]);
    setSeats(prevSeats => clearSelectedSeats(prevSeats));
  };

  const handleBookNow = () => {
    if (selectedSeats.length === 0) return;

    onBookingComplete(selectedSeats);
    setShowBookingToast(true);
    setTimeout(() => setShowBookingToast(false), 3000);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4">
      <div className="mx-auto max-w-6xl rounded-lg bg-white p-6 shadow-lg">
        <BookingTitle title={title} subTitle={subTitle} />

        <Screen />

        <SeatMap
          seats={seats}
          aislePosition={layout.aislePostion}
          seatsPerRow={layout.seatsPerRow}
          currency={currency}
          seatTypes={seatTypes}
          onSeatClick={handleSeatClick}
        />

        <Legend seatTypes={uniqueSeatTypes} currency={currency} />

        <Summary
          selectedSeats={selectedSeats}
          currency={currency}
          onReset={handleReset}
          onBookNow={handleBookNow}
        />
      </div>

      {showBookingToast && <BookingToast />}
    </div>
  );
};

export default SeatBooking;
