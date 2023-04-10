import React, { useState, useEffect } from 'react'
import CryptoTable from './Table/CryptoTable'
import Header from './Header/Header'
import './App.module.scss'


const App: React.FC = () => {
  return (
   <body>
    <div>
      <Header/>
      <CryptoTable />
   
    </div></body>
  )
}

export default App
