import {
  SEAT_COLORS,
  COLOR_CLASSES,
  SEAT_BASE_CLASS,
} from "./constants";

export const getColorClass = (colorName) =>
  COLOR_CLASSES[colorName] || COLOR_CLASSES.blue;

export const getSeatClassName = (seat) => {
  if (seat.status === "booked") {
    return `${SEAT_BASE_CLASS} bg-gray-400 border-gray-500 text-gray-600 cursor-not-allowed`;
  }

  if (seat.selected) {
    return `${SEAT_BASE_CLASS} bg-green-500 border-green-600 text-white transform scale-110`;
  }

  return `${SEAT_BASE_CLASS} ${getColorClass(seat.color)} cursor-pointer`;
};

export const getSeatTypeForRow = (row, seatTypes) => {
  const entries = Object.entries(seatTypes);

  for (let i = 0; i < entries.length; i++) {
    const [type, details] = entries[i];

    if (details.rows.includes(row)) {
      return {
        ...details,
        type,
        color: SEAT_COLORS[i % SEAT_COLORS.length],
      };
    }
  }

  const [firstType, firstDetails] = entries[0];
  return {
    type: firstType,
    color: SEAT_COLORS[0],
    ...firstDetails,
  };
};

export const getUniqueSeatTypes = (seatTypes) =>
  Object.entries(seatTypes).map(([type, details], index) => ({
    type,
    color: SEAT_COLORS[index % SEAT_COLORS.length],
    ...details,
  }));

export const createSeatGrid = (layout, seatTypes, bookedSeats) => {
  const seats = [];

  for (let row = 0; row < layout.rows; row++) {
    const seatType = getSeatTypeForRow(row, seatTypes);
    const seatRow = [];

    for (let seat = 0; seat < layout.seatsPerRow; seat++) {
      const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`;

      seatRow.push({
        id: seatId,
        row,
        seat,
        type: seatType?.type || "regular",
        price: seatType?.price || 150,
        color: seatType?.color || "blue",
        status: bookedSeats.includes(seatId) ? "booked" : "available",
        selected: false,
      });
    }

    seats.push(seatRow);
  }

  return seats;
};

export const getRowLabel = (rowIndex) => String.fromCharCode(65 + rowIndex);

export const getTotalPrice = (selectedSeats) =>
  selectedSeats.reduce((total, seat) => total + seat.price, 0);

export const toggleSeatInGrid = (seats, rowIndex, seatIndex) =>
  seats.map((row, rIndex) =>
    row.map((seat, sIndex) => {
      if (rIndex === rowIndex && sIndex === seatIndex) {
        return { ...seat, selected: !seat.selected };
      }
      return seat;
    }),
  );

export const clearSelectedSeats = (seats) =>
  seats.map((row) =>
    row.map((seat) => (seat.selected ? { ...seat, selected: false } : seat)),
  );
