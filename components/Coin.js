import React, {useState, useEffect } from 'react'
import { setPosition } from '../helperFunctions/firebaseHelper';
import { useAuth } from "../auth/UserAuthContext";

import { database } from "../firebase";

import {
  doc,
  updateDoc,
  deleteField,
  setDoc,
  collection,
  getDoc,
  set,
  getDocFromServer,
} from "firebase/firestore";


export default function Coin({coin, position, key }) {
  const auth = useAuth();
  const [content, setContent] = useState("");
  
  //let init = getPosition(auth, coin.id);
  //console.log(position);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const getPosition = async function (auth, coin) {
      let userId = auth.user.uid;
      let colRef = collection(database, userId);
      let docRef = doc(colRef, "position");
      let docSnap = await getDoc(docRef);
      if (docSnap.data() == null || docSnap.data()[coin] == undefined) {
        setPos(0);
        return 0;
      }
      setPos(docSnap.data()[coin]);
      return docSnap.data()[coin];
    };
    getPosition(auth, coin.id);
  }, []);
  function handleBuy(e){
    e.preventDefault();
    const size = parseFloat(parseFloat(content).toFixed(2));
    
    if (size >= 0.01) {
        setPos(size + pos);
        const entry = size + pos;
        setPosition(auth, entry, coin.id);
        setContent("");
    } else {
        alert('Please enter a number above or equal to 0.01');
    }
  }
  function handleSell(e){
    e.preventDefault();
    const size = parseFloat(parseFloat(content).toFixed(2));
    if (size >= 0.01) {
        setPos(pos - size);
        const entry = pos - size;
        setPosition(auth, entry, coin.id);
        setContent("");
    } else {
        alert('Please enter a within 0.01 and your position size');
    }
  }
  return (
    <div className="flex items-center grid grid-cols-9">
        <img src={coin.image} className={"w-10 h-10"}/>
        <h1>{coin.name}</h1>
        <h1 className={coin.price_change_24h >= 0 ? "text-green-400" : "text-red-500" }>{"$" + coin.current_price}</h1>
        <h1 className={coin.price_change_24h >= 0 ? "text-green-400" : "text-red-500"}>{coin.price_change_percentage_24h + "%"}</h1>
        
        <h1>{coin.market_cap}</h1>
        <h1>{pos}</h1>
        <h1 className={coin.price_change_24h >= 0 ? "text-green-400" : "text-red-500"}>{"$" + (pos * coin.current_price).toFixed(4)}</h1>
        
        <form className="flex">
            <input className="w-28 text-black" placeholder="Enter Size" value={content} onChange={(e) => setContent(e.target.value)}/>
            <button className="bg-green-600 px-3 ml-4" onClick={handleBuy}>Buy</button>
            <button className="bg-red-600 px-3 mx-4" onClick={handleSell}>Sell</button>
        </form>
        
        
    </div>
  )
}