import React, { useState, useEffect } from 'react';
import styles from './Modal.module.scss';

type ModalProps = {
  onClose: () => void;
  onSubmit: (value: number, name: string, price: number) => void;
  name: string;
  price: number;
  
}

interface Item {
  name: string;
  price: number;
  quantity: number;
}

const Modal: React.FC<ModalProps> = ({ onClose, onSubmit, name, price }) => {
  const [value, setValue] = useState(0);
  const [bagItems, setBagItems] = useState<Item[]>([]);

  useEffect(() => {
    const storedBagItems = localStorage.getItem('bagItems');
    if (storedBagItems) {
      setBagItems(JSON.parse(storedBagItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
  }, [bagItems]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value, name, price);
    onClose();
  }
  const handleAddItem = () => {
    // const { name, price, value } = props;
    const existingItemIndex = bagItems.findIndex((item) => item.name === name);

    if (existingItemIndex !== -1) {
      const existingItem = bagItems[existingItemIndex];
      existingItem.quantity += value;
      console.log(value)
      const updatedItems = [...bagItems];
      updatedItems[existingItemIndex] = existingItem;
      setBagItems(updatedItems);
    } else {
      const newItem = { name, price, quantity: value };
      setBagItems([...bagItems, newItem]);
    }

  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Add to Bag {name}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            step="0.5"
            value={value}
            onChange={(event) => setValue(parseFloat(event.target.value))}
            required
          />
          <div className={styles.buttons}>
            <button type="submit" onClick={handleAddItem}>Add</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal;
