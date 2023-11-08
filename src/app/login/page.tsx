"use client";

import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  //If input fields are empty, don't allow button click
  const [buttonDisabled, setButtonDisabled] = useState(false);

  //State to display "Loading" after clicking signup
  const [loading, setLoading] = useState(false);

  //State for the show password functionality
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //State to check if email already exists
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      const status = error.response.status;
      if (status == 400) {
        setUserExists(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg ml-2 mr-2 w-96">
        <div className="flex justify-center items-center">
          <div
            className={
              loading
                ? "w-12 h-12 border-t-2 border-blue-500 border-solid rounded-full animate-spin mb-4"
                : "hidden"
            }
          ></div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          LOGIN
        </h1>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Welcome Back!
        </h1>
        <hr className="my-4" />

        <label
          className="block text-sm text-gray-600 font-semibold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          className="w-full text-black px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-3"
        />

        <label
          className="block text-sm text-gray-600 font-semibold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <div className="flex">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            className="w-full text-black px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-3"
          />
          <div
            className="cursor-pointer p-1 ml-2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <Image
                src="/eye.svg"
                alt=""
                className="mt-1"
                width={30}
                height={24}
                priority
              />
            ) : (
              <Image
                src="/eye-closed-light.svg"
                alt=""
                className="mt-1"
                width={30}
                height={24}
                priority
              />
            )}
          </div>
        </div>

        <div
          className={!userExists ? "hidden" : "text-red-400 text-sm mb-2 ml-1"}
        >
          Invalid login credentials!
        </div>

        <Link
          href="/signup"
          className="text-blue-600 hover:text-blue-500 text-xs"
        >
          Forgot Password?
        </Link>

        <button
          type="button"
          onClick={onLogin}
          className={
            buttonDisabled
              ? "w-full bg-blue-200 text-white font-semibold py-2 rounded focus:outline-none mb-4 mt-2"
              : "w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none mb-4 mt-2"
          }
        >
          Login
        </button>

        <Link
          href="/signup"
          className="text-gray-600 hover:text-gray-400 text-xs"
        >
          Don't have an account?
        </Link>
      </div>
    </div>
  );
}
