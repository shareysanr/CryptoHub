import React from 'react'
import {Logo} from '../public/logo.png'

import { useAuth } from "../auth/UserAuthContext";
import { useRouter } from "next/router";
export default function Navbar(){
  const auth = useAuth();
  const router = useRouter();
  const loggedIn = auth.user;
  return (
    <>
    <nav className="p-2 bg-black flex items-center justify-between">
        <div>
            <span className="text-2xl font-[Poppins] text-white cursor-pointer">
                <img src="/logo.png" className="w-20 inline"/>
                {"     Crypto Hub"}
            </span>
        </div>
        
        {loggedIn &&
        <ul className="flex items-center">
            <li className="mx-8">
                <a href="/" class="text-xl font-[Poppins] text-white">Home</a>
            </li>
            <li className="mx-8">
                <a onClick={(e)=>{
                    e.preventDefault();
                    router.push("/trade");
                }}
                class="text-xl font-[Poppins] text-white">Trade</a>
            </li>
            <li className="mx-8">
                <a href="#" onClick={() => {
                    auth.logOut();
                    router.push("/");
                   }} 
                   class="text-xl font-[Poppins] text-white">Logout</a>
            </li>
        </ul>
        }

        {!loggedIn &&
        <ul className="flex items-center">
            <li className="mx-8">
                <a href="/" class="text-xl font-[Poppins] text-white">Home</a>
            </li>
            <li className="mx-8">
                <a href="/signin" class="text-xl font-[Poppins] text-white">Sign In</a>
            </li>
            <li className="mx-8">
                <a href="/signup" class="text-xl font-[Poppins] text-white">Sign Up</a>
            </li>
        </ul>
        }

    </nav>
    <hr className="solid"/>
    </>
  );
}