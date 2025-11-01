import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const navigate = useNavigate();
 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://127.0.0.1:8000/api/login/", {
    
        email: email,
        password: password,
      });

      console.log("login Successful:", result.data);
      toast.success("Login successfully!");
         navigate("/welcome")
      
    } catch (error) {
      console.log("Signup Error:", error.response?.data || error);
      ("Login failed. Check console for details.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form onSubmit={handleSubmit} className="bg-gray-950 border border-gray-900 p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-black text-white p-2 mb-4 border border-white rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 bg-black text-white mb-6 border border-white rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-700 text-white p-2 rounded hover:bg-green-900 transition">
          Login
        </button>

        <p className="text-center text-white mt-4 text-lg">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
