"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage(){
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    }) 
    const[buttonDisable, setButtonDisable] = React.useState(false)
    const[loading, setLoading] = React.useState(false)

    const onSignUp = async()=>{
        try{
            setLoading(true)
            const response = await axios.post("/api/users/signup", user);
            router.push("/login")
        }catch{
            toast.error("Something bad happened")
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
            setButtonDisable(false)
        }else{
            setButtonDisable(true)
        }
    }, [user])

    return (
        <div className="flex text-center flex-col justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "SignUp"}</h1>
            <label htmlFor="username">Username</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="text" placeholder="username" value={user.username} onChange={(e)=>setUser({ ...user, username: e.target.value})}/>
        
            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="text" placeholder="email" value={user.email} onChange={(e)=>setUser({ ...user, email: e.target.value})}/>

            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="password" placeholder="password" value={user.password} onChange={(e)=>setUser({ ...user, password: e.target.value})}/>

            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onSignUp}>{buttonDisable ? "Unsubmit" : "Submit"}</button>
            <Link href="/login">Visit to login</Link>
        </div>
    )
}
