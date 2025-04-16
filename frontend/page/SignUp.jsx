// import { useState } from "react";
// import { Button } from "../components/Button";
// import { Heading } from "../components/Heading";
// import { InputBox } from "../components/InputBox";
// import { SubHeading } from "../components/SubHeading";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { BottomWarning } from "../components/BottomWarning";

// export const Signup = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   return (
//     <div className="bg-slate-300 h-screen flex justify-center">
//       <div className="flex flex-col justify-center">
//         <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
//           <Heading label={"Sign up"} />
//           <SubHeading label={"Enter your information to create an account"} />

//           <InputBox
//             onChange={(e) => setFirstName(e.target.value)}
//             placeholder="FirstName"
//             label={"First Name"}
//           />
//           <InputBox
//             onChange={(e) => setLastName(e.target.value)}
//             placeholder="LastName"
//             label={"Last Name"}
//           />
//           <InputBox
//             onChange={(e) => setUserName(e.target.value)}
//             placeholder="name_surname"
//             label={"Username"}
//           />
//           <InputBox
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="name@example.com"
//             label={"Email"}
//           />
//           <InputBox
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="••••••••"
//             label={"Password"}
//             type="password"
//           />

//           <div className="pt-4">
//             <Button
//               onClick={async () => {
//                 try {
//                   const response = await axios.post(
//                     "http://localhost:3006/api/v1/users/signup",
//                     {
//                       userName,
//                       email,
//                       firstName,
//                       lastName,
//                       password,
//                     }
//                   );
//                   localStorage.setItem("token", response.data.token);
//                   navigate("/dashboard");
//                 } catch (err) {
//                   console.error("Signup failed:", err);
//                   alert("Signup failed. Please check the form and try again.");
//                 }
//               }}
//               label={"Sign up"}
//             />
//           </div>

//           <BottomWarning
//             label={"Already have an account?"}
//             buttonText={"Sign in"}
//             to={"/signin"}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };




import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-200 to-purple-400 h-screen flex justify-center items-center">
      <div className="bg-gradient-to-r from-indigo-200 to-pink-300 p-10 rounded-lg shadow-2xl w-full max-w-lg">
        <Heading label={"Sign Up"} />
        <SubHeading label={"Create your account to get started!"} />

        <InputBox
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          label="First Name"
        />
        <InputBox
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          label="Last Name"
        />
        <InputBox
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          label="Username"
        />
        <InputBox
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          label="Email"
        />
        <InputBox
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          label="Password"
          type="password"
        />

        <div className="mt-6">
          <Button
            onClick={async () => {
              try {
                const response = await axios.post(
                  "http://localhost:3006/api/v1/users/signup",
                  {
                    userName,
                    email,
                    firstName,
                    lastName,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              } catch (err) {
                console.error("Signup failed:", err);
                alert("Signup failed. Please check the form and try again.");
              }
            }}
            label={"Sign Up"}
          />
        </div>

        <BottomWarning
          label={"Already have an account?"}
          buttonText={"Sign In"}
          to={"/signin"}
        />
      </div>
    </div>
  );
};
