import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Currency {
  name: string;
  price: number;
  quantity: number;
}

const Spread: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [initialValue, setInitialValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    // Получаем данные из локального хранилища и устанавливаем начальную стоимость портфеля
    const storedCurrencies = localStorage.getItem('bagItems');
    if (storedCurrencies) {
      const parsedCurrencies = JSON.parse(storedCurrencies);
      setCurrencies(parsedCurrencies);
      const initialValue = parsedCurrencies.reduce(
        (total: number, currency: Currency) => total + currency.price * currency.quantity,
        0,
      );
      setInitialValue(initialValue);
    }
  }, []);

  async function fetchCurrencies() {
    const response = await fetch('https://api.coincap.io/v2/assets?limit=100');
    const data = await response.json();
    
    // Используем параметр функции map для доступа к индексу текущего элемента массива
    const updatedCurrencies = currencies.map((item, index) => {
      const foundCurrency = data.data.find((currency: any) => currency.symbol === item.name);
 console.log(updatedCurrencies);
      if (foundCurrency) {
       
        return {
          ...item,
          price: foundCurrency.priceUsd,
          
        };
      }
      return item;
    });
    setCurrencies(updatedCurrencies);
  }

  useEffect(() => {
    const currentValue = currencies.reduce(
      (total: number, currency: Currency) => total + currency.price * currency.quantity,
      0,
    );
    setCurrentValue(currentValue);
  }, [currencies, currentValue]);
  
  
//   console.log(currentValue);

  const difference = initialValue - currentValue;
  const differencePercent = ((difference / initialValue) * 100).toFixed(2);

  return (
    <div className="header">
      <h3>You're Crypto</h3>
      <div className="portfolio">
        <span className="value">{initialValue.toFixed(2)} USD </span>
        <span className={`difference ${difference >= 0 ? 'positive' : 'negative'}`}>
          {currentValue.toFixed(2)} USD ({differencePercent}%)
        </span>
      </div>
    </div>
  );
};

export default Spread;