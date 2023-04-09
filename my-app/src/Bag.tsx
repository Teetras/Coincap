import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/Bag.module.scss'
interface Currency {
name: string;
price: number;
quantity: number;
}

const BagInfo: React.FC = () => {
const [currencies, setCurrencies] = useState<Currency[]>([]);

useEffect(() => {
// Получаем данные из локального хранилища и устанавливаем начальную стоимость портфеля
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
<div className="modal">
<div className="modal-content">
<h2>Bag Info</h2>
<table>
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
<td>
<button onClick={() => removeFromBag(currency.name)}>Remove</button>
</td>
</tr>
))}
</tbody>
</table>
<button className="close-button">Close</button>
</div>
</div>
);
};

export default BagInfo;