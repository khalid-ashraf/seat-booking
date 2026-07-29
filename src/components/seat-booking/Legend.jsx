import { getColorClass } from "./seatUtils";

const LegendItem = ({ className, label }) => (
  <div className="flex items-center gap-2">
    <div className={`mr-2 h-6 w-6 rounded-t-lg border-2 ${className}`} />
    <span className="text-sm">{label}</span>
  </div>
);

const Legend = ({ seatTypes, currency }) => (
  <div className="mb-6 flex flex-wrap justify-center gap-6 rounded-lg bg-gray-50 p-4">
    {seatTypes.map((seatType) => (
      <LegendItem
        key={seatType.type}
        className={getColorClass(seatType.color)}
        label={`${seatType.name} ${currency}${seatType.price}`}
      />
    ))}

    <LegendItem
      className="border-green-600 bg-green-500"
      label="Selected"
    />
    <LegendItem className="border-gray-500 bg-gray-400" label="Booked" />
  </div>
);

export default Legend;
