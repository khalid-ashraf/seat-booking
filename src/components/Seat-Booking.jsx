/**
 * This component should have the sections below:
 * Title, screeen, seat map, legend, summary and book button
 */

import { useState, useMemo } from "react";

const SeatBooking = ({
  layout = { rows: 8, seatsPerRow: 12, aislePostion: 5 },
  seatTypes = {
    standard: { name: "standard", price: 100, color: "blue", rows: [0, 1, 2] },
    premium: { name: "premium", price: 200, color: "purple", rows: [3, 4, 5] },
    business: { name: "business", price: 300, color: "yellow", rows: [6, 7] },
  },
  bookedSeats = [],
  currency = "$",
  onBookingComplete = () => {},
  title = "Imax",
  subTitle = "Odessey Movie",
}) => {
  const colors = ["blue", "purple", "yellow", "green", "red", "indigo", "pink", "gray"];

  const getSeatType = row => {
    const seatTypeEntries = Object.entries(seatTypes);

    for (let i = 0; i < seatTypeEntries.length; i++) {
      const [type, details] = seatTypeEntries[i];

      if (details.rows.includes(row)) {
        const color = colors[i % colors.length];

        return { ...details, type, color };
      }
    }

    const [firstType, firstDetails] = seatTypeEntries[0];
    return { type: firstType, color: colors[0], ...firstDetails };
  };

  const initializedSeats = useMemo(() => {
    const seats = [];

    for (let row = 0; row < layout.rows; row++) {
      const seatRow = [];
      const seatType = getSeatType(row);

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
  }, [layout, seatTypes, bookedSeats]);

  const [seats, setSeats] = useState(initializedSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const getColorClass = colorName => {
    const colorMap = {
      blue: "bg-blue-300 border-blue-500 hover:bg-blue-500 text-blue-900 hover:text-white",
      purple:
        "bg-purple-300 border-purple-600 hover:bg-purple-600 text-purple-900 hover:text-white",
      yellow:
        "bg-yellow-300 border-yellow-600 hover:bg-yellow-600 text-yellow-900 hover:text-white",
      green: "bg-green-300 border-green-600 text-white",
      red: "bg-red-300 border-red-600 hover:bg-red-600 text-red-900 hover:text-white",
      indigo:
        "bg-indigo-300 border-indigo-600 hover:bg-indigo-600 text-indigo-900 hover:text-white",
      pink: "bg-pink-300 border-pink-600 hover:bg-pink-600 text-pink-900 hover:text-white",
      gray: "bg-gray-300 border-gray-600 hover:bg-gray-600 text-gray-900 hover:text-white",
    };

    return colorMap[colorName] || colorMap.blue;
  };

  const getSeatClassName = seat => {
    const baseClass =
      "w-8 sm:w-10 sm:h-10 lg:h-12 m-1 rounded-t-lg border-2 transition-all duration-200 flex items-center justify-center text-xs sm:text-sm font-bold border-blue-300 text-blue-800";

    // more conditions
    if (seat.status === "booked") {
      return `${baseClass} bg-gray-400 border-gray-500 text-gray-600 cursor-not-allowed`;
    }

    if (seat.selected) {
      return `${baseClass} bg-green-500 border-green-600 text-white transform scale-110`;
    }

    return `${baseClass} ${getColorClass(seat.color)} cursor-pointer`;
  };

  const handleSeatClick = (rowIndex, seatIndex) => () => {
    const seat = seats[rowIndex][seatIndex];

    if (seat.status === "booked") return;

    const isCurrentlySelected = seat.selected;

    setSeats(prevSeats => {
      return prevSeats.map((r, rIndex) => {
        return r.map((s, sIndex) => {
          if (rIndex === rowIndex && sIndex === seatIndex) {
            return { ...s, selected: !s.selected };
          }

          return s;
        });
      });
    });

    if (isCurrentlySelected) {
      setSelectedSeats(prev => prev.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats(prev => [...prev, seat]);
    }
  };

  const handleReset = () => {
    setSelectedSeats([]);
    setSeats(prevSeats =>
      prevSeats.map(row => row.map(seat => (seat.selected ? { ...seat, selected: false } : seat)))
    );
  };

  const renderSeatSection = (seatRow, startIndex, endIndex) => {
    return (
      <div className="flex">
        {seatRow.slice(startIndex, endIndex).map((seat, index) => {
          return (
            <div
              key={seat.id}
              className={getSeatClassName(seat)}
              title={`${seat.id} - ${getSeatType(seat.row)?.name || "Regular"} - ${currency}${seat.price}`}
              onClick={handleSeatClick(seat.row, startIndex + index)}>
              {startIndex + index + 1}
            </div>
          );
        })}
      </div>
    );
  };

  const uniqueSeatTypes = Object.entries(seatTypes).map(([type, details], index) => {
    return { type, color: colors[index % colors.length], ...details };
  });

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      {/* title */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl lg:text-3xl fond-bold text-center mb-2 text-gray-800">{title}</h1>
        <p className="text-center text-gray-600 mb-6">{subTitle}</p>

        {/* screen */}
        <div className="mb-8">
          <div className="w-full h-4 bg-linear-to-r from-gray-300 via-gray-400 to-gray-500 rounded-lg mb-2 shadow-inner" />
          <p className="text-center text-sm text-gray-500 font-medium">Screen</p>
        </div>

        {/* Seat Map */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex flex-col items-center min-w-max">
            {seats?.map((row, rowIndex) => {
              return (
                <div key={rowIndex} className="flex items-center gap-2 mb-2">
                  <span className="w-8 text-center font-bold text-gray-600 mr-4">
                    {String.fromCharCode(65 + rowIndex)}
                  </span>

                  {renderSeatSection(row, 0, layout.aislePostion)}

                  <div className="w-8" />

                  {renderSeatSection(row, layout.aislePostion, layout.seatsPerRow)}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
          {uniqueSeatTypes.map(seatType => {
            return (
              <div key={seatType.type} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 border-2 rounded-t-lg mr-2 ${getColorClass(seatType.color) || "bg-blue-300 borderbluee-300"}`}
                />

                <span>
                  {seatType.name} {currency}
                  {seatType.price}
                </span>
              </div>
            );
          })}

          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 border-2 border-green-600 rounded-t-lg mr-2"></div>
            <span className="text-sm">Selected</span>
          </div>

          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-400 border-2 border-gray-500 rounded-t-lg mr-2"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>

        {/* Summary */}
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Summary</h3>
            <p className="text-sm text-gray-600">Selected Seats: {selectedSeats.length}</p>

            <p className="text-lg text-green-600 font-bold">
              Total Price: {currency}
              {selectedSeats.reduce((total, seat) => total + seat.price, 0)}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">
              Reset
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SeatBooking;
