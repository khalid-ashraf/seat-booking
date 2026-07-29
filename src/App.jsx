import SeatBooking from "./components/seat-booking";

function App() {
  return (
    <div>
      <SeatBooking
        layout={{ rows: 8, seatsPerRow: 12, aislePostion: 6 }}
        seatTypes={{
          standard: { name: "standard", price: 100, rows: [0, 1, 2] },
          premium: { name: "premium", price: 200, rows: [3, 4, 5] },
          business: { name: "business", price: 300, rows: [6, 7] },
        }}
        bookedSeats={["A1", "A2", "A3", "C6", "C7", "E10", "E11", "G12", "H12"]}
      />
    </div>
  );
}

export default App;
