import React, { useState, useEffect } from 'react'
import Service from '../services/CoinbaseService';
import AlertBar from '../component/AlertBar';
import { useNavigate  } from "react-router-dom";
import {Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Grid  } from '@mui/material';
const Home = () => {
    const history = useNavigate();
    const [coins, setCoins] = useState();

    const [stateAlert, setstateAlert] = useState({
        msg:"",
        myopen:false
    });

    useEffect(() => {
        Service.GetCoins().then((items) =>{
            console.log(items);
            setCoins(items);
          }).catch(error => {
              console.log(error.response)
              setstateAlert({
                msg:error.response.data.message,
                myopen:true
              });
          });
    },[])

    const handleClick = (evt) => {
        
        console.log(evt.target.id);
        history('/details/'+evt.target.id);
    }

    return (
        <div>
            <h1>Trade</h1>
            <Grid container spacing={2} sx={{display:'flex', justifyContent:'center'}}>
                {coins?.map((item, index) => {
                    return (
                        <Grid item spacing={1}>
                            <Card sx={{ width: 300 }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="100"
                                image={item.iconUrl}
                                alt={item.name}
                                
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button id={item.uuid} size="small" color="primary" onClick={handleClick}>
                                    Share
                                </Button>
                            </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <AlertBar open={stateAlert.myopen} msg={stateAlert.msg} />
        </div>
    )
}

export default Home
