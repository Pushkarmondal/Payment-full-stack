export function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md transition duration-300 ease-in-out"
    >
      {label}
    </button>
  );
}
