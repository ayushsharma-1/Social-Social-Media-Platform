import axios from "axios";
import { useRef,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        // Send registration data to the backend
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, user);
        // Set the userId in AuthContext after registration
        dispatch({ type: "LOGIN_SUCCESS", payload: { userId: res.data.userId } });
        navigate(`/Home`);
      } catch (err) {
        console.error("Axios Error: ", err.response || err.message);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social</h3>
          <span className="loginDesc">Connect with friends and the world around you on Lamasocial.</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Email" required ref={email} className="loginInput" type="email" />
            <input placeholder="Password" required ref={password} className="loginInput" type="password" minLength="6" />
            <input placeholder="Password Again" required ref={passwordAgain} className="loginInput" type="password" />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton" type="button" onClick={() => navigate("/login")}>Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}






// import axios from "axios";
// import { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./register.css";

// export default function Register() {
//   const username = useRef();
//   const email = useRef();
//   const password = useRef();
//   const passwordAgain = useRef();
//   const navigate = useNavigate();

//   const handleClick = async (e) => {
//     console.log('API URL:', process.env.REACT_APP_API_URL); // Check if it's the correct value

//     e.preventDefault();
//     if (passwordAgain.current.value !== password.current.value) {
//       passwordAgain.current.setCustomValidity("Passwords don't match!");
//     } else {
//       const user = {
//         username: username.current.value,
//         email: email.current.value,
//         password: password.current.value,
//       };
//       try {
//         // Send the registration data to the backend
//         await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, user);
//         navigate("/profile");
//       } catch (err) {
//         console.error("Axios Error: ", err.response || err.message);  // Log the error to console
//       }
//     }
//   };

//   return (
//     <div className="login">
//       <div className="loginWrapper">
//         <div className="loginLeft">
//           <h3 className="loginLogo">Social</h3>
//           <span className="loginDesc">
//             Connect with friends and the world around you on Lamasocial.
//           </span>
//         </div>
//         <div className="loginRight">
//           <form className="loginBox" onSubmit={handleClick}>
//             <input
//               placeholder="Username"
//               required
//               ref={username}
//               className="loginInput"
//             />
//             <input
//               placeholder="Email"
//               required
//               ref={email}
//               className="loginInput"
//               type="email"
//             />
//             <input
//               placeholder="Password"
//               required
//               ref={password}
//               className="loginInput"
//               type="password"
//               minLength="6"
//             />
//             <input
//               placeholder="Password Again"
//               required
//               ref={passwordAgain}
//               className="loginInput"
//               type="password"
//             />
//             <button className="loginButton" type="submit">
//               Sign Up
//             </button>
//             <button 
//               className="loginRegisterButton" 
//               type="button" 
//               onClick={() => navigate("/login")}
//             >
//             Log into Account
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
