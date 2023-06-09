import React, { useEffect, useState } from 'react'
// import axios from 'axios' 
import './App.css';
import Navbar from './Component/Navbar';
import CoinD from './Component/CoinD';
// import Main from './Component/Main';
import TrendingChart from './Component/TrendingChart';
import CurrencyExchange from './Component/CurrencyExchange';
import Chart from './Component/Chart';
// import { BrowserRouter, Route } from "react-router-dom";



function App() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState("")
  const [currencies, setCurrencies] = useState(['usd'])
  async function MyApi() {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencies}&order=market_cap_desc&per_page=9&page=1&sparkline=false&price_change_percentage=1h&locale=en`)
      const result = await response.json();
      console.log(result);
      setCoins(result)
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    MyApi();
  }, [currencies])

  const handleSearchChange = (e) => {
    const ths = e.target.value
    setSearch(ths)
  }

  const filtredCoin = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()));
  
  return (
    
    <div className="App">
      <div className='container-fluid'>
        <Navbar />
      </div>
      <div className='container d-flex' style={{ backgroundColor: "azure" }}>
        <div className='mt-2'>
          <div className='d-flex '>
            <div>
            <select
                className="form-select form-select-lg mb-3"
                onChange={(e) => setCurrencies(e.target.value)}
                style={{ width: "120px" }}
   z           >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="jpy">JPY</option>
                <option value="inr">INR</option>
                </select>
            </div>
            <div className='container-fluid '><form className='container-fluid ms-3'>
              <input key="id" class="form-control form-control-lg" type="text" placeholder="Search coin" aria-label=".form-control-lg example" onChange={handleSearchChange} />
            </form>

            </div>
          </div>
          <div className='m-1' style={{ boxShadow: '1px 2px 9px #F4AAB9',backgroundColor:"white" }}>

            {/* <Main name={coins.name} /> */}
            <Chart name={filtredCoin[0]?.name} vName={currencies} />
          </div>
          <div className='d-flex'>
            <div className='container-fluid m-2' style={{ boxShadow: '1px 2px 9px #F4AAB9',backgroundColor:"white" }}>
              <TrendingChart />
            </div>
            <div className='container-fluid m-2' style={{ boxShadow: '1px 2px 9px #F4AAB9', backgroundColor:"white"}}>
              <CurrencyExchange />
            </div>
          </div>
          
        </div>
        <div className='ms-md-2 mt-2' style={{ boxShadow: '1px 2px 9px #F4AAB9',backgroundColor:"white" }}>

            <h1>Cryptocurrency by market cap</h1>
            {filtredCoin.map((coin) => {
              return (
                <CoinD key={coin.id} id={coin.id} name={coin.name} image={coin.image} market_cap={coin.market_cap} market_cap_change_percentage_24h={coin.market_cap_change_percentage_24h} />)
            })}

          </div>



      </div>
    </div>
    )
    }
     
    export default App;
