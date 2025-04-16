// import { useEffect, useState } from "react";
// import { Button } from "./Button";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const Users = () => {
//   // Replace with backend call
//   const [users, setUsers] = useState([]);
//   const [filter, setFilter] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:3006/api/v1/users/bulk?filter=" + filter)
//       .then((response) => {
//         setUsers(response.data.user);
//       });
//   }, [filter]);

//   return (
//     <>
//       <div className="font-bold mt-6 text-lg">Users</div>
//       <div className="my-2">
//         <input
//           onChange={(e) => {
//             setFilter(e.target.value);
//           }}
//           type="text"
//           placeholder="Search users..."
//           className="w-full px-2 py-1 border rounded border-slate-200"
//         ></input>
//       </div>
//       <div>
//         {users.map((user) => (
//           <User key={user._id} user={user} />
//         ))}
//       </div>
//     </>
//   );
// };

// function User({ user }) {
//   const navigate = useNavigate();

//   return (
//     <div className="flex justify-between">
//       <div className="flex">
//         <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
//           <div className="flex flex-col justify-center h-full text-xl">
//             {user.firstName[0]}
//           </div>
//         </div>
//         <div className="flex flex-col justify-center h-ful">
//           <div>
//             {user.firstName} {user.lastName}
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col justify-center h-ful">
//         <Button
//           onClick={(e) => {
//             navigate("/send?id=" + user._id + "&name=" + user.firstName);
//           }}
//           label={"Send Money"}
//         />
//       </div>
//     </div>
//   );
// }


// Users.jsx
import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3006/api/v1/users/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-8 text-xl text-gray-800">Users</div>
      <div className="my-4 relative">
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
          className="w-full px-10 py-3 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:outline-none focus:ring-blue-200 transition-all shadow-sm"
        />
      </div>
      <div className="space-y-3">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  
  // Generate a consistent color based on the first letter
  const colorClasses = [
    "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-red-500", 
    "bg-yellow-500", "bg-indigo-500", "bg-pink-500", "bg-teal-500"
  ];
  
  const colorIndex = user.firstName.charCodeAt(0) % colorClasses.length;
  const bgColorClass = colorClasses[colorIndex];

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center">
        <div className={`rounded-full h-12 w-12 ${bgColorClass} flex justify-center items-center mr-4 text-white shadow-sm`}>
          <div className="text-xl font-medium">
            {user.firstName[0]}
          </div>
        </div>
        <div className="font-medium text-gray-800">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div>
        <Button
          onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}