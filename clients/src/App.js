import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEdit from './Pages/AddEdit';
import Home from './Pages/Home';
import View from './Pages/View';



const App = () => {
  return (
    <>
     <BrowserRouter>
      <ToastContainer position='top-center'/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/addContact" element={<AddEdit/>}/>
      <Route path="/update/:id" element={<AddEdit/>}/>
      <Route path="/View/:id" element={<View/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
