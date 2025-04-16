import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="text-xl text-center mt-6">
      <span className="text-gray-500">{label}</span>
      <Link className="text-blue-600 hover:underline ml-1" to={to}>
        {buttonText}
      </Link>
    </div>
  );
}
