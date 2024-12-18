"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);

            if (response.data.success) {
                // Save the token to local storage
                localStorage.setItem("token", response.data.token);
                
                toast.success("Login successful");
                router.push("/profile");
            } else {
                toast.error("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex text-center flex-col justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>

            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="text" placeholder="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />

            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="password" placeholder="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />

            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onLogin}>Submit</button>
            <Link href="/signup">Visit to signup</Link>
        </div>
    )
}
