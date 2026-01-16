import { useState } from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './home.jsx';
import BulughulmaramPage from './bulughulmaram/bulughulmaramPage.jsx';


function App(){

  return(
  <div className='container'>


    {/* <BulughulmaramPage/> */}
    <BrowserRouter>
      <Routes>
        <Route path="/bulughul-maram" element={<Home/>} />
        <Route path="/bulughul-maram/bulughulmaram" element={<BulughulmaramPage/>} />
      </Routes>
    </BrowserRouter>


  </div>
  )
}

export default App
