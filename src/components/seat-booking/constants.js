export const SEAT_COLORS = [
  "blue",
  "purple",
  "yellow",
  "green",
  "red",
  "indigo",
  "pink",
  "gray",
];

export const COLOR_CLASSES = {
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

export const SEAT_BASE_CLASS =
  "w-8 sm:w-10 sm:h-10 lg:h-12 m-1 rounded-t-lg border-2 transition-all duration-200 flex items-center justify-center text-xs sm:text-sm font-bold border-blue-300 text-blue-800";

export const DEFAULT_LAYOUT = { rows: 8, seatsPerRow: 12, aislePostion: 5 };

export const DEFAULT_SEAT_TYPES = {
  standard: { name: "standard", price: 100, rows: [0, 1, 2] },
  premium: { name: "premium", price: 200, rows: [3, 4, 5] },
  business: { name: "business", price: 300, rows: [6, 7] },
};
