/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";




function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router=useRouter()
  const [email,setEmail]=useState("");
  const[password,setPassword]=useState("")
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignin=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setErrorMessage(""); // Reset error message

    try {
      const response = await axios.post("https://task-management-application-vj6i.onrender.com/user/signin", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
      router.push("/");
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }

  }
  
  return (
    <div className="gradient-color-bg w-auto h-auto ">
      <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-auto h-auto text-center">
        <h1 className="text-2xl font-bold mb-6">
          Welcome to <span className="text-purple-600">Workflow!</span>
        </h1>
        <form onSubmit={handleSignin}>
           
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e)=>(setPassword(e.target.value))}
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            required
          />
          {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
          <button
            disabled={loading}
            type="submit"
            className="w-full linear-btn-color text-white py-3 rounded linear-btn-color:hover  transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4">
          Don&apos;t have an account? <Link href="/signup" className="text-purple-600 hover:underline">Create a new account.</Link>
        </p>
      </div>
    </div>
    </div>
  );
}

export default page;
