import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import styles from  "./CryptoTable.module.scss"
import Modal from './Modal'


type Crypto={
    id:string;
    name: string;
    symbol:string;
    price:number
}
const CryptoTable: React.FC=()=>{
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null)

    const PER_PAGE = 10;
    const offset = currentPage * PER_PAGE;


    useEffect(() => {
        const fetchCryptos = async () => {
          const response = await axios.get(
            "https://api.coincap.io/v2/assets?limit=100"
          )
          setCryptos(response.data.data.map((crypto: any) => ({
            id: crypto.id,
            name: crypto.name,
            symbol: crypto.symbol,
            price: parseFloat(crypto.priceUsd),
          })))
        };
        fetchCryptos();
      }, [])
  
      const handlePageClick = (data: any) => {
        setCurrentPage(data.selected);
    }
    const handleAddToPortfolio = (crypto: Crypto) => {
      setSelectedCrypto(crypto);
      setIsModalOpen(true);
    }
  
  const handleModalClose = () => {
      setIsModalOpen(false);
  }
  const handleModalSubmit = (value: number, name: string,price:number) => {
    console.log(`Adding ${value} ${name} to portfolio`);
    setIsModalOpen(false);
  };


      const displayCryptos = cryptos
      .slice(offset, offset + PER_PAGE)
      .map((crypto) => (
        <tr key={crypto.id}  >
          <td>{crypto.name}</td>
          <td>{crypto.symbol}</td>
          <td>{crypto.price}</td>
          <td>
            <button onClick={() => handleAddToPortfolio(crypto)}>+</button>
          </td>
        </tr>
      ));
    
    const pageCount = Math.ceil(cryptos.length / PER_PAGE)
  
    return (
      <div>
        <table className={styles.cryptoTable} >
          <thead>
            <tr >
              <th>Name</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Add to Portfolio</th>
            </tr>
          </thead>
          <tbody>{displayCryptos}</tbody>
        </table>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
        />
      {selectedCrypto && isModalOpen && (
      <Modal
      onClose={handleModalClose}
      onSubmit={handleModalSubmit}
          name={selectedCrypto.name} // передаем значение name crypto
          price={selectedCrypto.price}
    />
      )}

      </div>
    );
}
export default CryptoTable;