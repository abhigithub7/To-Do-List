import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
    const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://127.0.0.1:8000/api/signup/", {
        username: username,
        email: email,
        password: password,
      });

      console.log("Signup Successful:", result.data);
      toast.success('Signup Succesfully');
       navigate("/welcome")
    } catch (error) {
      console.log("Signup Error:", error.response?.data || error);
      toast.error("Signup failed. Check console for details.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-950 border border-gray-900 p-12 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full bg-black text-white p-2 mb-4 border border-white rounded"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />

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
          className="w-full bg-black text-white p-2 mb-6 border border-white rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-900 transition">
          Signup
        </button>

        <p className="text-center text-white mt-4 text-lg">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
