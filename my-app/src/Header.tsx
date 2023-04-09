import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from "./style/Header.module.scss"
import Spread from './Spread';
import BagInfo from './Bag';

const Header: React.FC=()=>{
    const [topCrypto, setTopCrypto] = useState([]);
    useEffect(() => {
        const fetchCryptos = async () => {
          const response = await axios.get(
            "https://api.coincap.io/v2/assets?limit=3"
          )
          setTopCrypto(response.data.data.map((crypto: any) => ({
            id: crypto.id,
            name: crypto.name,
            symbol: crypto.symbol,
            price: parseFloat(crypto.priceUsd),
          })))
        };
        fetchCryptos();
      }, [])
    
      return ( <div className="">
        <div className={styles.topCrypto} >
           <p> Top Crypta</p>
          {topCrypto.map((crypto: any) => (

            <p key={crypto.id}>
              {crypto.name}: ${crypto.price}
            </p>
          ))} 
          <Spread/>
          <BagInfo/>
        </div>
       </div>
      );
};
export default Header