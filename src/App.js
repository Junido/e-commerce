import React,  { useState} from 'react';
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './component/Navbar';
import {Home, Char } from './Pages';
import LateralBar from './component/LateralBar';
import { Container} from '@mui/material';
function App() {

  const [openMenu, setOpenMenu] = useState(false);
 
  return (
    <div className="App">
        <Router>
          <Navbar setOpenMenu = {setOpenMenu} openMenu= {openMenu} />
          <LateralBar open={openMenu} />
          <Container className='app-container' sx={{ overflow: 'auto'}} maxWidth="lg">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/char' element={<Char />} />
            </Routes>
          </Container>
        </Router>
    </div>
  );
}

export default App;
