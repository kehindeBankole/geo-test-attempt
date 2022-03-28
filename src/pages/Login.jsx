import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function handleChange(e) {
    setUserDetails({
      ...userDetails,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }
  function handleSubmit(e) {
    console.log();
    if (
      validEmailRegex.test(userDetails.email) === true &&
      userDetails.password.length >= 8
    ) {
      navigate("/map");
    }else{
alert("incorrect details")
    }

    e.preventDefault();
  }
  return (
    <div className="antialiased bg-gray-200 text-gray-900">
      <div className="flex items-center h-screen w-full">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">
            Login
          </span>
          <form className="mb-4" onSubmit={handleSubmit}>
            <div className="mb-4 md:w-full">
              <label htmlFor="email" className="block text-xs mb-1">
                Username or Email
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="email"
                name="email"
                id="email"
                placeholder="Username or Email"
                value={userDetails.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6 md:w-full">
              <label htmlFor="password" className="block text-xs mb-1">
                Password
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={userDetails.password}
                onChange={handleChange}
                autoComplete="true"
              />
                 <small className="opacity-40">password length must be 8 or greater</small>
            </div>
         
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
            >
              Login
            </button>
          </form>
          <button className="text-blue-700 text-center text-sm">
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
