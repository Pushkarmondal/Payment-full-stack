// export const Balance = ({ value }) => {
//   return (
//     <div className="flex">
//       <div className="font-bold text-lg">Your balance</div>
//       <div className="font-semibold ml-4 text-lg">Rs {value}</div>
//     </div>
//   );
// };

export const Balance = ({ value }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg mb-8">
      <div className="text-blue-100 text-lg mb-1">Your balance</div>
      <div className="text-3xl font-bold">Rs {value}</div>
    </div>
  );
};