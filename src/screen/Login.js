import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [logout, setLogout] = useState(true);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("token", json.authToken);
        navigate("/");
        setLogout(true);
      } else {
        alert("Enter Valid Credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar logout={logout} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4 form-control">
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                required
              />
              <label>
                <span style={{ transitionDelay: "0ms" }}>E</span>
                <span style={{ transitionDelay: "50ms" }}>m</span>
                <span style={{ transitionDelay: "100ms" }}>a</span>
                <span style={{ transitionDelay: "150ms" }}>i</span>
                <span style={{ transitionDelay: "200ms" }}>l</span>
              </label>
            </div>
            <div className="mb-4 form-control">
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                required
              />
              <label>
                <span style={{ transitionDelay: "0ms" }}>P</span>
                <span style={{ transitionDelay: "50ms" }}>a</span>
                <span style={{ transitionDelay: "100ms" }}>s</span>
                <span style={{ transitionDelay: "150ms" }}>s</span>
                <span style={{ transitionDelay: "200ms" }}>w</span>
                <span style={{ transitionDelay: "250ms" }}>o</span>
                <span style={{ transitionDelay: "300ms" }}>r</span>
                <span style={{ transitionDelay: "350ms" }}>d</span>
              </label>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-white text-black hover:text-white border border-black py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Login
              </button>
              <Link
                to="/signup"
                className="bg-white text-black hover:text-white border border-black py-2 px-4 rounded-md hover:bg-gray-600"
              >
                New User
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
