import React, { useState, useEffect } from 'react'
import Service from '../services/CoinbaseService';
import AlertBar from '../component/AlertBar';
import { useNavigate  } from "react-router-dom";
import {Card, CardActionArea, CardMedia, CardContent, Typography,ListItemButton, CardActions, Button, Grid, CircularProgress, TextField ,Paper,List,ListItem,ListItemAvatar,Avatar,ListItemText,Divider} from '@mui/material';
import { flexbox } from '@mui/system';
const Home = () => {
    const history = useNavigate();
    const [coins, setCoins] = useState();
    const [stats, setStats] = useState();
    const [ search, setSearch ] = useState("");
    const [stateAlert, setstateAlert] = useState({
        msg:"",
        myopen:false
    });

    useEffect(() => {
        Service.GetCoins().then((items) =>{
           console.log(items);
            setStats(items?.stats);
            setCoins(items?.coins?.filter(x=> x.name.toUpperCase().includes(search.toUpperCase())));
          }).catch(error => {
             
              setstateAlert({
                msg:error?.response?.data?.message,
                myopen:true
              });
          });
    },[search])

    const handleClick = (evt,uid) => {
  
        history('/details/'+uid);
    }

    const handleChange = (event) => {
        
        setSearch(event.target.value);
    };

    return (
        <div>
            <h1>Trade</h1>
            <Paper sx={{marginBottom:"10px", padding:"10px",height:"50px", display:"flex", alignItems:"center"}}>
                <TextField size="small"  onChange={handleChange} id="outlined-basic" label="Search" variant="outlined" />
            </Paper>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {coins ? coins.map((item, index) => {
                        return (
                            <>
                             <ListItemButton onClick={(event) => handleClick(event,item.uuid)}>
                                <ListItem alignItems="flex-start" >
                                    <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={item.iconUrl} />
                                    </ListItemAvatar>
                                    <ListItemText
                                    
                                    primary={item.name}
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Ali Connors
                                        </Typography>
                                        {" — I'll be in your neighborhood doing errands this…"}
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                            </ListItemButton>
                            <Divider variant="inset" component="li" />
                        </>
                        );
                    }) : <CircularProgress />}
                </List>
            <AlertBar open={stateAlert.myopen} msg={stateAlert.msg} />
        </div>
    )
}

export default Home
