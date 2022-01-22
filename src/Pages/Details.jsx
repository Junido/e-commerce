import React,  { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import coinBaseService from '../services/CoinbaseService';
import {Grid, Typography, ButtonGroup, Button} from '@mui/material';
import AlertBar from '../component/AlertBar';
import { useParams } from "react-router-dom";
 
function Details(props) {
    var { id } = useParams();
    const [coinDetails, setCoinDetails] = useState([]);
    const [coin, setCoin] = useState([]);
    const [taux, setTaux] = useState(0);
    const [isTauxMin, setisTauxMin] = useState(0);
    const [period, setPeriod] = useState('7d');
    const [stateAlert, setstateAlert] = useState({
      msg:"",
      myopen:false
    });
    
    useEffect(() => {
      GetCoin(id);
      GetCoinHistory(period);
    },[period]);

    const GetCoin = (coin) => {
      coinBaseService.GetCoin(coin).then((items) =>{
        console.log('coin',items);
        setCoinDetails({
          price:items.price,
          name:items.name,
          description:items.description,
          change: items.change,
          iconUrl: items.iconUrl
        });
      }).catch(error => {
        setstateAlert({
          msg:error?.response?.data?.message,
          myopen:true
        });
    });
    }

    const GetCoinHistory = (period) => {
        coinBaseService.GetCoinHistory(id,period).then((items) =>{

        var mTaux = (((Number(items[items.length - 1]?.price) - Number(items[0]?.price)) / Number(items[items.length - 1]?.price)) * 100).toFixed(2);
        setTaux(mTaux);
        setisTauxMin(Math.sign(mTaux) === -1);
        setCoin(items);
      }).catch(error => {
          setstateAlert({
            msg:error?.response?.data?.message,
            myopen:true
          });
      });
    }

    const getPrice = () => {
        var res = coin.reverse(x => x.timestamp*1000).map(x => x.price);
        return res;
    }

    const getTime = () => {
        var times = coin.reverse(x => x.timestamp*1000).map(x => new Date(x.timestamp*1000).toDateString());
        return times;
    }
    
    const data = {
        labels: getTime(),
        datasets: [
          {
            label: 'Price in USD',
            data: getPrice(),
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 1)',
          }
        ],
    };
      
    const options = {
      scales: {
          yAxes: {
            ticks: {
              beginAtZero: true
            }
          }
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
      },
      buttonActive: {
        color:'black',
        border:'none',
        fontSize:'12px',
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
      }
    }
      
    
   const handleClick = (event) => {

      var value = event.target.id;
      setPeriod(value);
      GetCoinHistory(value);
     
    }

    return (
        <div >
           <AlertBar open={stateAlert.myopen} msg={stateAlert.msg} />
            <Grid container spacing={3}>
              <Grid style={style.boxPrice} item xs={12} md={6}>
                <Typography style={style.devise} variant="span" >
                  $
                </Typography>
                <Typography style={style.price} variant="span" >
                  {coinDetails && coinDetails.price}
                </Typography>
                {/* <Typography style={style.devise} variant="span" >
                  {coin && `.${coin[coin.length - 1]?.price}`}
                </Typography> */}
                <Typography style={isTauxMin ? style.tauxMin : style.tauxPlus} variant="span" >
                  {coin && 
                    `${taux}%`
                  }
                </Typography>
              </Grid>
              <Grid style={style.buttonBox} item xs={12} md={6}>
                <ButtonGroup variant="text">
                  {/* 24h 7d 30d 1y 5y */}
                  <Button onClick={handleClick} id="24h" style={period === "24h" ? style.buttonActive : style.buttonGroup}>1D</Button>
                  <Button onClick={handleClick} id="7d" style={period === "7d" ? style.buttonActive : style.buttonGroup}>1W</Button>
                  <Button onClick={handleClick} id="30d" style={period === "30d" ? style.buttonActive : style.buttonGroup}>1M</Button>
                  <Button onClick={handleClick} id="1y" style={period === "1y" ? style.buttonActive : style.buttonGroup}>1Y</Button>
                  <Button onClick={handleClick} id="5y" style={period === "5y" ? style.buttonActive : style.buttonGroup}>ALL</Button>
                </ButtonGroup>
              </Grid>
              <Grid  item xs={12}>
                <Line className='char-container' data={data} options={options} />
              </Grid>
            </Grid>
        </div>
    )
}

export default Details
