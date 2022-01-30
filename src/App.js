import React,  { useState} from 'react';
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './component/Navbar';
import {Home, Details } from './Pages';
import LateralBar from './component/LateralBar';
import { Container, Grid} from '@mui/material';
function App() {

  const [openMenu, setOpenMenu] = useState(true);
 
  return (
    <div className="App">
        <Router>
          <Grid container spacing={2}>
            <Grid item spacing={1} xs={12} md={12}>
              <Navbar setOpenMenu = {setOpenMenu} openMenu= {openMenu} />
            </Grid>
            <Grid item spacing={1} xs={2} md={2}>
              <LateralBar open={openMenu} />
            </Grid>
            <Grid item xs={9} md={9}>
              <Container className='app-container' sx={{ overflow: 'auto'}} maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/details/:id' element={<Details />} />
                </Routes>
              </Container>
            </Grid>
          </Grid>
        </Router>
    </div>
  );
}

export default App;
