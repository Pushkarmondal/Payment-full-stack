export function InputBox({ label, placeholder, onChange, type = "text" }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200 ease-in-out"
      />
    </div>
  );
}
