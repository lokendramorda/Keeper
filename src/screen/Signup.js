import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Signup = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [logout, setLogout] = useState(true);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/login");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar logout={logout} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-4 form-control">
              <input
                type="text"
                id="name"
                name="name"
                value={credentials.name}
                onChange={onChange}
                required
              />
              <label>
                <span style={{ transitionDelay: "0ms" }}>U</span>
                <span style={{ transitionDelay: "50ms" }}>s</span>
                <span style={{ transitionDelay: "100ms" }}>e</span>
                <span style={{ transitionDelay: "150ms" }}>r</span>
                <span style={{ transitionDelay: "200ms" }}>n</span>
                <span style={{ transitionDelay: "250ms" }}>a</span>
                <span style={{ transitionDelay: "300ms" }}>m</span>
                <span style={{ transitionDelay: "350ms" }}>e</span>
              </label>
            </div>
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
            <button
              type="submit"
              className="bg-white text-black hover:text-white border border-black py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
