import { getSeatClassName, getSeatTypeForRow, getRowLabel } from "./seatUtils";

const Seat = ({ seat, displayNumber, currency, seatTypes, onClick }) => {
  const seatType = getSeatTypeForRow(seat.row, seatTypes);

  const isBooked = seat.status === "booked";

  return (
    <button
      type="button"
      className={`${getSeatClassName(seat)} p-0 disabled:opacity-100`}
      title={`${seat.id} - ${seatType?.name || "Regular"} - ${currency}${seat.price}`}
      onClick={onClick}
      disabled={isBooked}
      aria-label={`Seat ${seat.id}`}
      aria-pressed={seat.selected}>
      {displayNumber}
    </button>
  );
};

const SeatSection = ({ seats, startIndex, endIndex, currency, seatTypes, onSeatClick }) => (
  <div className="flex">
    {seats.slice(startIndex, endIndex).map((seat, index) => {
      const seatIndex = startIndex + index;

      return (
        <Seat
          key={seat.id}
          seat={seat}
          displayNumber={seatIndex + 1}
          currency={currency}
          seatTypes={seatTypes}
          onClick={() => onSeatClick(seat.row, seatIndex)}
        />
      );
    })}
  </div>
);

const SeatRow = ({
  row,
  rowIndex,
  aislePosition,
  seatsPerRow,
  currency,
  seatTypes,
  onSeatClick,
}) => (
  <div className="mb-2 flex items-center gap-2">
    <span className="mr-4 w-8 text-center font-bold text-gray-600">{getRowLabel(rowIndex)}</span>

    <SeatSection
      seats={row}
      startIndex={0}
      endIndex={aislePosition}
      currency={currency}
      seatTypes={seatTypes}
      onSeatClick={onSeatClick}
    />

    <div className="w-8" aria-hidden="true" />

    <SeatSection
      seats={row}
      startIndex={aislePosition}
      endIndex={seatsPerRow}
      currency={currency}
      seatTypes={seatTypes}
      onSeatClick={onSeatClick}
    />
  </div>
);

const SeatMap = ({ seats, aislePosition, seatsPerRow, currency, seatTypes, onSeatClick }) => (
  <div className="mb-6 overflow-x-auto">
    <div className="flex min-w-max flex-col items-center">
      {seats.map((row, rowIndex) => (
        <SeatRow
          key={getRowLabel(rowIndex)}
          row={row}
          rowIndex={rowIndex}
          aislePosition={aislePosition}
          seatsPerRow={seatsPerRow}
          currency={currency}
          seatTypes={seatTypes}
          onSeatClick={onSeatClick}
        />
      ))}
    </div>
  </div>
);

export default SeatMap;
