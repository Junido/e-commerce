import React from 'react';
import { Line } from 'react-chartjs-2';
import coinBaseService from '../service/CoinbaseService';
import {FormControl, InputLabel,Select,MenuItem ,Grid} from '@mui/material';
import { useState, useEffect } from 'react';

function Char() {
  
    
    const [coin, setCoin] = useState([]);
    const [crypto, setcrypto] = React.useState('ADA-USD');

    useEffect(() => {
      LoadChar('ADA-USD');
    }, []);
    
    const LoadChar = (mcrypto) =>{
      coinBaseService.GetProductTrades(mcrypto).then((items) =>{
        setCoin(items);
      });
    }

    const getSellPrice = () => {
        var res = coin.filter(x => x.side ==='sell').map(x => x.price);
        return res;
    }

    const getBuyPrice = () => {
        var res = coin.filter(x => x.side ==='buy').map(x => x.price);
        return res;
    }

    const getTime = () => {
        var times = coin.map(x => Date(x.time).split(" ")[4]);
        return times;
    }
    
    const data = {
        labels: getTime(),
        datasets: [
          {
            label: 'Buy',
            data: getBuyPrice(),
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 1)',
          },
          {
            label: 'Sell',
            data: getSellPrice(),
            fill: false,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 1)',
          },
        ],
    };
      
    const options = {
      scales: {
          x: {
            grid: {
              display:false
            },
            display:true
          },
          y: {
            grid: {
              display:false
            },
            display:false
          },
          tension:0.1,
          
      },
      elements: {
        point:{
          radius:0
        },
      },
      plugins: {
        legend: {
            display:false,
            labels: {
                // This more specific font property overrides the global property
                font: {
                    size: 20
                },
                
            }
        }
      }
    }

      
    const handleChange = (event) => {
      console.log(event.target.value);
      setcrypto(event.target.value);
      LoadChar(event.target.value);
    };
    return (
        <div>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Crypto</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={crypto}
                      label="Crypto"
                      onChange={handleChange}
                    >
                      <MenuItem value='ADA-USD'>Cardano</MenuItem>
                      <MenuItem value='SHIB-USD'>SHIBA INU</MenuItem>
                      <MenuItem value='ETH-USD'>Ethereum</MenuItem>
                    </Select>
                  </FormControl>
              </Grid>
              <Grid item xs={6}>
                  wait
              </Grid>
              <Grid item xs={12}>
                <Line data={data} options={options} />
              </Grid>
            </Grid>
        </div>
    )
}

export default Char
