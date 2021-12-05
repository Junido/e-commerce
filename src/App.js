import React,  { useState, useEffect } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Char from './component/Char';
import {FormControl, InputLabel,Select,MenuItem ,Container, Box, Grid } from '@mui/material';

function App() {

  const [crypto, setCrypto] = useState('');
  const style = {
    boxShadow: 0,
    border: '1px solid rgba(153,153,153,0.2)', 
    borderRadius:'6px',
    backgroundColor:'rgb(255 255 255)', 
    padding:'15px'
  }

  const handleChange = (event) => {
    //console.log(event.target.value);
    setCrypto(event.target.value);
  };

  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Box sx={style}>
            <Char crypto="7d" />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={style}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Crypto</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={crypto}
                label="Crypto"
                onChange={handleChange}
              >
                <MenuItem value='ADA_USDT'>Cardano</MenuItem>
                <MenuItem value='SHIB_USDT'>SHIBA INU</MenuItem>
                <MenuItem value='ETH_USDT'>Ethereum</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
        
      
      </Container>
    </div>
  );
}

export default App;
