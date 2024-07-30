/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function page() {

  const router=useRouter()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (e:React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault(); // Prevent default form submission

      setLoading(true);
      setErrorMessage("");
      const response = await axios.post(
        "https://task-management-application-vj6i.onrender.com/user/signup",

        {
          name,
          password,
          email
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
      router.push("/");
    } catch (error) {
      console.error("Error signing up:", error);
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        console.error("Server responded with status:", error.response?.status);
        console.error("Response data:", error.response?.data);
        setErrorMessage("An error occurred during signup. Please try again.");
      } else if (error instanceof Error) {
        // Handle general errors
        console.error("Error:", error.message);
        setErrorMessage(error.message);
      } else {
        // Handle unknown errors
        console.error("An unknown error occurred");
        setErrorMessage("An unknown error occurred. Please try again.");
      }
    }finally {
      setLoading(false); 
    }
  };

  return (
    <div className="gradient-color-bg ">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-6">
            Welcome to <span className="text-purple-600">Workflow!</span>
          </h1>
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              required
            />
            {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition duration-200"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
          <p className="mt-4">
            Already have an account?{" "}
            <Link href="/signin" className="text-purple-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
