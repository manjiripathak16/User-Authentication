"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { isPasswordValid } from "@/helpers/isPasswordValid";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  //If input fields are empty, don't allow button click
  const [buttonDisabled, setButtonDisabled] = useState(false);

  //State to display invalid password message (if password does not satisfy constraints)
  const [okPassword, setokPassword] = useState(true);

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
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      isPasswordValid(user.password)
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  useEffect(() => {
    if (isPasswordValid(user.password) || user.password == "") {
      setokPassword(true);
    } else {
      setokPassword(false);
    }
  }, [user.password]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
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
      <div className="bg-white p-8 rounded shadow-lg ml-2 mr-2 w-96 ">
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
          SIGN UP
        </h1>
        <hr className="my-4" />

        <label
          htmlFor="username"
          className="block text-sm text-gray-600 font-semibold mb-2"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
          className="w-full text-black px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-3"
        />

        <label
          htmlFor="email"
          className="block text-sm text-gray-600 font-semibold mb-2"
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
          htmlFor="password"
          className="block text-sm text-gray-600 font-semibold mb-2"
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
          className={okPassword ? "hidden" : "text-red-400 text-sm mb-2 ml-3"}
        >
          Pick a stronger password!
        </div>
        <div
          className={!userExists ? "hidden" : "text-red-400 text-sm mb-2 ml-1"}
        >
          Email already exists! Please go to Login.
        </div>

        <ul className="list-disc mb-2 ml-4 text-sm">
          <li className="text-black">Mix of uppercase & lowercase letters</li>
          <li className="text-black">Minimum 8 characters long</li>
          <li className="text-black">Contain at least 1 number</li>
        </ul>

        <button
          type="button"
          onClick={onSignup}
          className={
            buttonDisabled
              ? "w-full bg-blue-200 text-white font-semibold py-2 rounded focus:outline-none mb-4 mt-2"
              : "w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none mb-4 mt-2"
          }
        >
          SIGN UP
        </button>

        <Link
          className="text-blue-600 hover:text-blue-400 text-sm"
          href="/login"
        >
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
