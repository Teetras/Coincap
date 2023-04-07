import React, { useState } from 'react';
import styles from './Modal.module.scss';

type ModalProps={
    onClose: () => void;
    onSubmit: (value: number, cryptoName: string) => void;
    cryptoName: string; // добавляем свойство cryptoName

}

const Modal : React.FC<ModalProps>=({ onClose, onSubmit,cryptoName  })=>{
    const [value, setValue] = useState(0);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit(value, cryptoName);
      onClose();
  // console.log(`Adding ${cryptoName} to portfolio`);

  }
    return (
      <div className={styles.modalOverlay}>
      <div className={styles.modal}>
      <h2>Add to Portfolio {cryptoName}</h2>
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