import React, { useState, useEffect } from 'react';

type BagItem = {
  name: string;
  price: number;
  quantity: number;
};

const Bag: React.FC = () => {
  const [BagioItems, setBagioItems] = useState<BagItem[]>([]);

  useEffect(() => {
    const storedBagioItems = localStorage.getItem('bagioItems');
    if (storedBagioItems) {
      setBagioItems(JSON.parse(storedBagioItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bagItems', JSON.stringify(BagioItems));
  }, [BagioItems]);

  const handleAddItem = (name: string, price: number, quantity: number) => {
    const existingItem = BagioItems.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += quantity;
      setBagioItems([...BagioItems]);
    } else {
      setBagioItems([...BagioItems, { name, price, quantity }]);
    }
  };

  const handleRemoveItem = (name: string) => {
    const newItems = BagioItems.filter((item) => item.name !== name);
    setBagioItems(newItems);
  };

  const totalValue = BagioItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Bag</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>price</th>
            <th>Quantity</th>
            <th>Total Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {BagioItems.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity}</td>
              <td>
                <button onClick={() => handleRemoveItem(item.name)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>Total value: {totalValue}</div>
    </div>
  );
};

export default Bag;
