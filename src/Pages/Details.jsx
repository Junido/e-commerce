import React,  { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import coinBaseService from '../services/CoinbaseService';
import {Grid, Typography, ButtonGroup, Button} from '@mui/material';
import AlertBar from '../component/AlertBar';
import { useParams } from "react-router-dom";

function Details() {
    var { id } = useParams();
    const PeriodBtn = [
		  {'code':'24h', 'value':'1D'},
		  {'code':'7d',  'value':'1W'},
		  {'code':'30d', 'value':'1M'},
		  {'code':'1y',  'value':'1Y'},
		  {'code':'3y',  'value':'3Y'},
		  {'code':'5y', 'value':'ALL'}
	  ]
    const [coinDetails, setCoinDetails] = useState([]);
    const [coin, setCoin] = useState([]);
    const [taux, setTaux] = useState(0);
    const [isTauxMin, setisTauxMin] = useState(0);
    const [period, setPeriod] = useState('7d');
    const [stateAlert, setstateAlert] = useState({ msg:"", myopen:false});

    useEffect(() => {
        GetCoin(id);
        GetCoinHistory(period);
    },[period,id]);

    const GetCoin = (coin) => {
      coinBaseService.GetCoin(coin).then((items) =>{
        
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
        coinBaseService.GetCoinHistory(id,period).then((res) =>{
        var items = res.reverse(x => x.timestamp).filter(f => f.price != null);
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
        var res = coin.map(x => x.price);
        return res;
    }

    const getTime = () => {
        var times = coin.map(x => new Date(x.timestamp*1000).toDateString());

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
              beginAtZero: true,
              display:false
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
                display:false,
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
        color:'red',
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
              <Grid item xs={3} md={1}>
                <img alt={coinDetails.name} src={coinDetails.iconUrl} width={80} />
              </Grid>
              <Grid item xs={9} md={11}>
                <h1>{coinDetails.name}</h1>
              </Grid>
              <Grid style={style.boxPrice} item xs={12} md={6}>
                <Typography style={style.devise} variant="span" >
                  $
                </Typography>
                <Typography style={style.price} variant="span" >
                  {coinDetails && 
                    Number(coinDetails.price)
                  }
                </Typography>
                <Typography style={isTauxMin ? style.tauxMin : style.tauxPlus} variant="span" >
                  {coin && 
                    `${taux}%`
                  }
                </Typography>
              </Grid>
              <Grid style={style.buttonBox} item xs={12} md={6}>
                <ButtonGroup variant="text">
                  {/* 24h 7d 30d 1y 3y 5y */}
                  {PeriodBtn.map(p => {
                    return (
                      <Button onClick={handleClick} id={p.code} style={period === p.code ? style.buttonActive : style.buttonGroup}>{p.value}</Button>
                    )
                  })}
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
