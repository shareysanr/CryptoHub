import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Coin from '../components/Coin';
import Navbar from '../components/Navbar';

export default function Trade(){
    const [coins, setCoins] = useState([])
    const [searchresults, setSearchResults] = useState('')
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h';
  
    
    useEffect(() => {
      axios.get(url).then(res => {
        setCoins(res.data);
      }).catch(function (error) {
      })
    }, [])
    
    return (
      <div className="bg-black">
        <Navbar/>
        <div className="text-white pt-4">
          <div>
            <div className="flex items-center grid grid-cols-9">
              <h1 className="underline">Logo</h1>
              <h1 className="underline">Name</h1>
              <h1 className="underline">Price</h1>
              <h1 className="underline">Price Change in 24h</h1>
              
              <h1 className="underline">Market Cap</h1>
              <h1 className="underline">Position Size</h1>
              <h1 className="underline">Position Size in $</h1>
              <h1 className="underline">Trade Coin</h1>
              
            </div>
            {coins.map(coin =>
              <Coin coin={coin} key={coin.id}/>
            )}
          </div>
        </div>
      </div>
      
    );
}
