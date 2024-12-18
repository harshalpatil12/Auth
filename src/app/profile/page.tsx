"use client"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  // Logout handler function
  const onLogout = async () => {
    try {
      // Call the logout API
      const response = await axios.get("/api/users/logout");

      // Check if the response indicates success
      if (response.status === 200) {
        toast.success("Logout successfully");
        router.push("/login"); // Redirect to login page after logout
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("Something went wrong during logout");
    }
  };

  const getUserDetails = async () => {
    const token = localStorage.getItem("token"); // assuming the token is stored in localStorage
    try {
      const res = await axios.get("/api/users/me", {  
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("token dataaaa", res.data.data._id);
      setData(res.data.data._id);
    } catch (error) {
      console.error("Error fetching user details:");
    }
  };
  

  return (
    <div className="flex text-center flex-col justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <p>Profile page is here</p>
      <h2>{data === 'nothing' ? "nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <button
        onClick={onLogout}
        className="p-2 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600 transition"
      >
        LogOut
      </button>
      <button
        onClick={getUserDetails}
        className="p-2 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600 transition"
      >
        View user info
      </button>
    </div>
  );
}
