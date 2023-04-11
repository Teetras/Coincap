import React, { useState, useEffect } from 'react';
import styles from './Modal.module.scss';

interface Currency {
name: string;
price: number;
quantity: number;
}

interface BagInfoProps {
    handleCloseBag: () => void;
}

const BagInfo: React.FC<BagInfoProps> = ({handleCloseBag}) => {
const [currencies, setCurrencies] = useState<Currency[]>([]);

useEffect(() => {
const storedCurrencies = localStorage.getItem('bagItems');
if (storedCurrencies) {
const parsedCurrencies = JSON.parse(storedCurrencies);
setCurrencies(parsedCurrencies);
}
}, []);

function removeFromBag(name: string) {
const updatedCurrencies = currencies.filter((currency) => currency.name !== name);
localStorage.setItem('bagItems', JSON.stringify(updatedCurrencies));
setCurrencies(updatedCurrencies);
}

return (
    <div className={styles.modalOverlay}>
        <div className={styles.modal}>
            <h2>Bag Info</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Value</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currencies.map((currency) => (
                        <tr key={currency.name}>
                            <td>{currency.name}</td>
                            <td>{currency.quantity.toFixed(2)}</td>
                            <td>{currency.price.toFixed(2)} USD</td>
                            <td>{(currency.price * currency.quantity).toFixed(2)} USD</td>
                            <td><button className={styles.btn} onClick={() => removeFromBag(currency.name)}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className={styles.close_button} onClick={handleCloseBag}>Close</button>
        </div>
    </div>
)
};

export default BagInfo;