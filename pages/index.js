import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Coin from '../components/Coin';
import Navbar from '../components/Navbar';
import { useAuth } from "../auth/UserAuthContext";
import { useRouter } from "next/router";
import { router } from 'react-router';

export default function Home() {
  const auth = useAuth();
  const router = useRouter();
  function handleClick(e) {
    e.preventDefault();
    
    if (auth.user) {
      router.push("/trade")
    } else {
      router.push("/signup")
    }
  }

  return (
    <div className="bg-black h-screen">
      <Navbar/>
      <div className="text-white text-center font-[Poppins] h-fit">
          <div className="text-4xl pt-40">Paper Trade</div>
          <div className="text-4xl pt-2">Cryptocurrency Anywhere</div>
          <button className="text-2xl text-black py-3 px-5 my-8 bg-white" onClick={handleClick}>
            Get Started
          </button>
          <div className="text-2xl">Build Skills by Trading Over 100 Coins </div>
          <div className="text-2xl">With A $50000 Paper Account</div>
      </div>
    </div>
    
  );
}