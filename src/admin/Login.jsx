// import { useState } from "react";

import { useEffect, useState } from "react";
import supabase from "./supabase-client";
import { useAuth } from "./AuthContext";
import ProtectedComponent from "./ProtectedComponent";
import { useNavigate } from "react-router-dom";


function Login() {
    const {user,setUser,signOut}=useAuth();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const login = async(e)=>{
        const {data,error} = await supabase.auth.signInWithPassword({
                                                    email:email,
                                                    password:password});
        if (error){
            console.error(error);
            return;
        }
        setUser(data.session);
        navigate("/");
        // console.log("You have successfully logged in.")

    }


    return(
        <div>
            {
                user?
                    <ProtectedComponent>
                        (
                            <>
                            <h3>You are currently logged in. Do you want to logout?</h3>
                            <button onClick={signOut}>Logout</button>
                            </>
                            
                        )
                    </ProtectedComponent>
                :
                    <form onSubmit={login}>
                        <h2>For admin only</h2>
                        <div>
                            <label>Email:</label>
                            <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
                        </div>
                        <button type="submit">Login</button>
                    </form>
            }


            

            
        </div>
    )
}

export default Login;