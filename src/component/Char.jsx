import React from 'react';
import { Line } from 'react-chartjs-2';
import coinBaseService from '../service/CoinbaseService';
import {FormControl, InputLabel,Select,MenuItem ,Grid, Typography, ButtonGroup, Button} from '@mui/material';
import { useState, useEffect } from 'react';

function Char() {
  
    
    const [coin, setCoin] = useState([]);
    const [crypto, setcrypto] = React.useState('ADA-USD');
    const [taux, setTaux] = useState(0);
    const [isTauxMin, setisTauxMin] = useState(0);

    useEffect(() => {

      const interval = setInterval(() => {
        LoadChar('ADA-EUR');
      }, 5000);
      return () => clearInterval(interval);
     
    }, []);
    
    const LoadChar = (mcrypto) =>{
      coinBaseService.GetProductTrades(mcrypto).then((items) =>{
        setCoin(items);
        var mTaux = (((Number(items[0]?.price) - Number(items[items.length - 1]?.price)) / Number(items[0]?.price)) * 100).toFixed(2);
        setTaux(mTaux);
        setisTauxMin(Math.sign(mTaux) == -1);
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
        var times = coin.map(x => x.time.split("T")[1].split(".")[0]);
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
            align:'end',
            labels: {
                // This more specific font property overrides the global property
                font: {
                    size: 12
                },
                
            }
        }
      }
    }

    const style = {
      boxPrice:{
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      },
      price: {
        fontSize :'48px',
        color:'black',
        textAlign:'left',
        paddingLeft:'7px',
        lineHeight: '1',
      },
      devise: {
        fontSize :'32px',
        position:'relative',
        verticalAlign:'baseline',
        fontWeight: 400
      },
      tauxMin: {
        color:'red',
        fontSize:'18px',
        fontWeight: 400,
        paddingLeft:'5px'
      },
      tauxPlus: {
        color:'green',
        fontSize:'18px',
        fontWeight: 400,
        paddingLeft:'5px'
      },
      buttonBox:{
        textAlign:'right',
      },
      buttonGroup:{
        color:'black',
        border:'none',
        fontSize:'12px',
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
              {/* <Grid item xs={12} md={3} >
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
              </Grid> */}
              <Grid style={style.boxPrice} item xs={12} md={6}>
                <Typography style={style.devise} variant="span" >
                  €
                </Typography>
                <Typography style={style.price} variant="span" >
                  {coin && Number(coin[0]?.price).toFixed(2).split(".")[0]}
                </Typography>
                <Typography style={style.devise} variant="span" >
                  {coin && `.${Number(coin[0]?.price).toFixed(2).split(".")[1]}`}
                </Typography>
                <Typography style={isTauxMin ? style.tauxMin : style.tauxPlus} variant="span" >
                  {coin && 
                    `${taux}%`
                  }
                </Typography>
              </Grid>
              <Grid style={style.buttonBox} item xs={12} md={6}>
                <ButtonGroup variant="text">
                  <Button style={style.buttonGroup}>1H</Button>
                  <Button style={style.buttonGroup}>1D</Button>
                  <Button style={style.buttonGroup}>1W</Button>
                  <Button style={style.buttonGroup}>1M</Button>
                  <Button style={style.buttonGroup}>1Y</Button>
                  <Button style={style.buttonGroup}>ALL</Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12}>
                <Line data={data} options={options} />
                <hr/>
              </Grid>
              <Grid item xs={12}>
                <h3>Market stats</h3>

              </Grid>
            </Grid>
        </div>
    )
}

export default Char
