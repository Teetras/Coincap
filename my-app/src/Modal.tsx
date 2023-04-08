import React, { useState } from 'react';
import styles from './Modal.module.scss';

type ModalProps={
    onClose: () => void;
    onSubmit: (value: number, name: string,price:number) => void;
    name: string; // добавляем свойство name
    price:number;

}

const Modal : React.FC<ModalProps>=({ onClose, onSubmit,name,price  })=>{
    const [value, setValue] = useState(0);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit(value, name,price);
      onClose();
  // console.log(`Adding ${name} to portfolio`);

  }
    return (
      <div className={styles.modalOverlay}>
      <div className={styles.modal}>
      <h2>Add to Bag {name}</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" step="0.5" value={value} onChange={(event) => setValue(parseFloat(event.target.value))} required />
        <div className={styles.buttons}>
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
    </div>
    
      );
}
export default Modal;