const BookingTitle = ({ title, subTitle }) => (
  <header className="mb-6 text-center">
    <h1 className="mb-2 text-2xl font-bold text-gray-800 lg:text-3xl">{title}</h1>
    <p className="text-gray-600">{subTitle}</p>
  </header>
);

export default BookingTitle;
