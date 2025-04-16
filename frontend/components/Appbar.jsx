// export const Appbar = () => {
//   return (
//     <div className="shadow h-14 flex justify-between">
//       <div className="flex flex-col justify-center h-full ml-4">Payment App</div>
//       <div className="flex">
//         <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
//           <div className="flex flex-col justify-center h-full text-xl">User</div>
//         </div>
//       </div>
//     </div>
//   );
// };


export const Appbar = () => {
  return (
    <div className="bg-white shadow-md h-16 flex justify-between items-center px-6">
      <div className="flex items-center h-full">
        <div className="text-blue-600 font-bold text-xl flex items-center gap-2">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Payment App
        </div>
      </div>
      <div className="flex items-center">
        <div className="rounded-full h-10 w-10 bg-blue-600 text-white flex justify-center items-center shadow-sm">
          <div className="text-sm font-medium">User</div>
        </div>
      </div>
    </div>
  );
};