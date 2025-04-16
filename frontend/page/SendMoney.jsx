// import { useSearchParams } from "react-router-dom";
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Importing the useNavigate hook

// export const SendMoney = () => {
//   const [searchParams] = useSearchParams();
//   const id = searchParams.get("id");
//   const name = searchParams.get("name");
//   const [amount, setAmount] = useState(0);
//   const navigate = useNavigate(); // Hook for navigation

//   const handleTransfer = async () => {
//     try {
//       // Sending the transfer request
//       const response = await axios.post(
//         "http://localhost:3006/api/v1/accounts/transfer",
//         {
//           to: id,
//           amount,
//         },
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       );

//       // If the transfer is successful, redirect to the dashboard
//       if (response.status === 200) {
//         navigate("/dashboard"); // Redirect to the dashboard
//       } else {
//         alert("Transfer failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Transfer failed:", error);
//       alert("Transfer failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center h-screen bg-gray-100">
//       <div className="h-full flex flex-col justify-center">
//         <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
//           <div className="flex flex-col space-y-1.5 p-6">
//             <h2 className="text-3xl font-bold text-center">Send Money</h2>
//           </div>
//           <div className="p-6">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
//                 <span className="text-2xl  text-white">
//                   {name[0].toUpperCase()}
//                 </span>
//               </div>
//               <h3 className="text-2xl font-semibold">{name}</h3>
//             </div>
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <label
//                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                   htmlFor="amount"
//                 >
//                   Amount (in Rs)
//                 </label>
//                 <input
//                   onChange={(e) => setAmount(e.target.value)}
//                   type="number"
//                   className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
//                   id="amount"
//                   placeholder="Enter amount"
//                 />
//               </div>
//               <button
//                 onClick={handleTransfer} // Use the handleTransfer function
//                 className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center"
//               >
//                 <svg
//                   className="h-5 w-5 mr-2"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 5l7 7-7 7M5 5l7 7-7 7"
//                   />
//                 </svg>
//                 Transfer Amount
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Wallet } from "lucide-react";
import { PaymentSuccess } from "../components/PaymentSuccess";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);


  const handleTransfer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3006/api/v1/accounts/transfer",
        { to: id, amount },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 10000); // Wait 7 seconds before redirecting
      } else {
        alert("Transfer failed. Please try again.");
      }
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed. Please try again.");
    }
  };
      
      if (success) {
            return <PaymentSuccess/>
      }


  return (
    <div className="flex justify-center  items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full  h-full max-w-2xl max-h-2xl p-5">
        <div className="bg-gray-100  rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
          {/* Header Section */}
          <div className="px-8 pt-8 pb-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Send Money</h2>
              <Wallet className="w-8 h-8 text-green-500" />
            </div>

            {/* Profile Section */}
            <div className="flex  bg-gradient-to-l  from-gray-200 to-white-100 items-center space-x-4 p-4 bg-gray-50 rounded-xl mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-inner">
                <span className="text-2xl font-semibold text-white">
                  {name?.[0]?.toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sending to</p>
                <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
              </div>
            </div>
          </div>

          {/* Amount Input Section */}
          <div className="px-8 pb-8">
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setAmount(Number(e.target.value))}
                    type="number"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-lg"
                    id="amount"
                    placeholder="Enter amount"
                    min="0"
                  />
                </div>
              </div>

              {/* Transfer Button */}
              <button
                onClick={handleTransfer}
                className="w-full bg-gradient-to-l  from-green-200 to-blue-500 hover:bg-green-600 text-black-600 rounded-xl py-4 font-medium text-lg transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-lg flex items-center justify-center space-x-2 group"
              >
                <span>Transfer Amount</span>
                <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
              </button>
              {/* {success && (
                <div className="mt-4 text-center text-green-600 font-semibold text-lg">
                  ✅ Transfer successful! Redirecting to dashboard...
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};