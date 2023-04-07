import React, { useState, useEffect } from 'react'
// import ReactPaginate from 'react-paginate'
import CryptoTable from './CryptoTable'
import Header from './Header'

const App: React.FC = () => {
  return (
   
    <div>
      <Header/>
      <CryptoTable />
    </div>
  )
}

export default App
