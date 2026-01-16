import { useState } from 'react'
import '../App.css'

// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import ImageList from './oldimgListSummarised.jsx';
import AddHadithForm from './addHadithForm.jsx';
import CompiledGallery from './compiledGallery.jsx';

function BulughulmaramPage(){
  const [refreshToggle,setRefreshToggle]=useState(false);

  return(
  <div>
    {/* <div className='container'> */}
    <CompiledGallery/>
    {/* </div> */}
    {/* <AddHadithForm setRefreshToggle={setRefreshToggle}/>; */}
    
  </div>

  )
}

export default BulughulmaramPage
