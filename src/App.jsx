import React from 'react'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import BuyerPage from './pages/BuyerPage'
import SellerPage from './pages/SellerPage'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/buyerpage' element={<BuyerPage/>}/>
        <Route path='/sellerpage' element={<SellerPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
