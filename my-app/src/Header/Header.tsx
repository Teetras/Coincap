import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Header.module.scss";
import Spread from "./Spread";
import BagInfo from "../Modal elements/Bag";

const Header: React.FC = () => {
  const [topCrypto, setTopCrypto] = useState([]);
  const [isBagInfoOpen, setIsBagInfoOpen] = useState(false);

  useEffect(() => {
    const fetchCryptos = async () => {
      const response = await axios.get(
        "https://api.coincap.io/v2/assets?limit=3"
      );
      setTopCrypto(
        response.data.data.map((crypto: any) => ({
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
          price: parseFloat(crypto.priceUsd),
        }))
      );
    };
    fetchCryptos();
  }, []);

  const handleBagInfoOpen = () => {
    setIsBagInfoOpen(true);
  };
  
  const handleCloseBag = () => {
    setIsBagInfoOpen(false);
  };

  return (
    <div className={styles.head}>
      <div className={styles.topCrypto}>
        <p> Top Crypta</p>
        {topCrypto.map((crypto: any) => (
          <p className={styles.listCript} key={crypto.id}>
            {crypto.name}: ${crypto.price.toFixed(2)}
          </p>
        ))}
      </div>
      <Spread />
      <button className={styles.btnOpenBag} onClick={handleBagInfoOpen}>
        Open Bag
      </button>

      {isBagInfoOpen && <BagInfo handleCloseBag={handleCloseBag} />}
    </div>
  );
};
export default Header;
