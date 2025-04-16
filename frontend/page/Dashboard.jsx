// import { useState } from "react";
// import { Appbar } from "../components/Appbar";
// import { Balance } from "../components/Balance";
// import { Users } from "../components/Users";
// import { useEffect } from "react";
// import axios from "axios";

// export const Dashboard = () => {
//       const [balance, setBalance] = useState(null);

//       useEffect(() => {
//         const fetchBalance = async () => {
//           try {
//             const res = await axios.get(
//               "http://localhost:3006/api/v1/accounts/balance",
//               {
//                 headers: {
//                   Authorization: "Bearer " + localStorage.getItem("token"),
//                 },
//               }
//             );
//             setBalance(res.data.balance.toFixed(2)); // Format nicely
//           } catch (err) {
//             console.error("Failed to fetch balance", err);
//             setBalance("Error");
//           }
//         };

//         fetchBalance();
//       }, []);
//   return (
//     <div className="bg-gradient-to-r from-green-200 to-blue-400">
//       <Appbar />
//       <div className="m-8 ">
//         <Balance value={balance !== null ? balance : "Loading..."} />
//         <Users />
//       </div>
//     </div>
//   );
// };



// import { useState } from "react";
// import { Appbar } from "../components/Appbar";
// import { Balance } from "../components/Balance";
// import { Users } from "../components/Users";
// import { useEffect } from "react";
// import axios from "axios";

// export const Dashboard = () => {
//   const [balance, setBalance] = useState(null);

//   useEffect(() => {
//     const fetchBalance = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3006/api/v1/accounts/balance",
//           {
//             headers: {
//               Authorization: "Bearer " + localStorage.getItem("token"),
//             },
//           }
//         );
//         setBalance(res.data.balance.toFixed(2)); // Format nicely
//       } catch (err) {
//         console.error("Failed to fetch balance", err);
//         setBalance("Error");
//       }
//     };

//     fetchBalance();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
//       <Appbar />
//       <div className="max-w-4xl mx-auto p-6">
//         <Balance value={balance !== null ? balance : "Loading..."} />
//         <Users />
//       </div>
//     </div>
//   );
// };

// // Appbar.jsx
// export const Appbar = () => {
//   return (
//     <div className="bg-white shadow-md h-16 flex justify-between items-center px-6">
//       <div className="flex items-center h-full">
//         <div className="text-blue-600 font-bold text-xl flex items-center gap-2">
//           <svg
//             className="h-6 w-6"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           Payment App
//         </div>
//       </div>
//       <div className="flex items-center">
//         <div className="rounded-full h-10 w-10 bg-blue-600 text-white flex justify-center items-center shadow-sm">
//           <div className="text-sm font-medium">User</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Balance.jsx
// export const Balance = ({ value }) => {
//   return (
//     <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg mb-8">
//       <div className="text-blue-100 text-lg mb-1">Your balance</div>
//       <div className="text-3xl font-bold">Rs {value}</div>
//     </div>
//   );
// };


// Dashboard.jsx
import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3006/api/v1/accounts/balance",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setBalance(res.data.balance.toFixed(2)); // Format nicely
      } catch (err) {
        console.error("Failed to fetch balance", err);
        setBalance("Error");
      }
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3006/api/v1/users/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-200 to-blue-400">
      <Appbar />
      
      {/* Full-screen card container */}
      <div className="flex-1 flex items-stretch p-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full flex flex-col">
          {/* Balance section */}
          <div className="bg-gradient-to-r from-green-200 to-blue-400 p-6">
            <div className="font-bold text-lg text-gray-800">Your balance</div>
            <div className="font-semibold text-2xl mt-2 text-gray-800">Rs {balance !== null ? balance : "Loading..."}</div>
          </div>
          
          {/* Users section */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="font-bold text-lg text-gray-800 mb-4">Users</div>
            <div className="relative mb-6">
              <svg 
                className="absolute left-3 top-3 h-5 w-5 text-gray-400" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:outline-none focus:ring-blue-200"
              />
            </div>
            
            {/* Make the user list take the remaining space with scrolling */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {users.map((user) => (
                <User key={user._id} user={user} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// User component
function User({ user }) {
  const navigate = useNavigate();
  
  // Color mapping based on first letter
  const colorClasses = [
    "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-red-500", 
    "bg-yellow-500", "bg-indigo-500", "bg-pink-500", "bg-teal-500"
  ];
  
  const colorIndex = user.firstName.charCodeAt(0) % colorClasses.length;
  const bgColorClass = colorClasses[colorIndex];

  return (
    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-all border border-gray-100">
      <div className="flex items-center">
        <div className={`rounded-full h-10 w-10 ${bgColorClass} flex justify-center items-center mr-3 text-white`}>
          <div className="text-lg font-medium">
            {user.firstName[0]}
          </div>
        </div>
        <div className="font-medium text-gray-800">
          {user.firstName} {user.lastName}
        </div>
      </div>

      <div>
        <button
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition-all"
        >
          Send Money
        </button>
      </div>
    </div>
  );
}