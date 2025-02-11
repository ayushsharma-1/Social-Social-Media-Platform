import "./login.css";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
  
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email: email.current.value,
        password: password.current.value,
      });
  
      console.log("Login Response:", res.data);
  
      // Dispatch full user data (AuthContext will handle localStorage)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  
      navigate("/Home");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      console.error("Login Error:", err.response?.data || err.message);
    }
  };
  

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social</h3>
          <span className="loginDesc">Connect with friends on Social.</span>
        </div>
        <div className="loginRight">
          <form className="loginBox">
            <input placeholder="Email" required ref={email} className="loginInput" type="email" />
            <input placeholder="Password" required ref={password} className="loginInput" type="password" />
            <button className="loginButton" type="submit" onClick={handleLogin}>Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" type="button" onClick={() => navigate("/register")}>Create a New Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}



