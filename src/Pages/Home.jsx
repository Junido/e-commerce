import React, { useState, useEffect } from 'react'
import Service from '../services/CoinbaseService';
import AlertBar from '../components/AlertBar';
import { useNavigate  } from "react-router-dom";
import {Pagination, Typography,ListItemButton, Grid, CircularProgress, TextField ,Paper,List,ListItem,ListItemAvatar,Avatar,ListItemText,Divider} from '@mui/material';

const Home = () => {
    const history = useNavigate();
    const [coins, setCoins] = useState();
    const [stats, setStats] = useState();
    const [search, setSearch ] = useState("");
    const [page, setPage ] = useState(1);
    const [stateAlert, setstateAlert] = useState({
        msg:"",
        myopen:false
    });
    
    useEffect(() => {
        Service.GetCoins().then((items) =>{
           console.log(items);
            setStats(items?.stats);
            var start = search != "" ? 0 : ((page-1)*10);
            var end = search != "" ? 10 : 10*(page-1)+10;
            setCoins(items?.coins?.filter(x=> x.name.toUpperCase().includes(search.toUpperCase())).slice(start,end));
          }).catch(error => {
             
              setstateAlert({
                msg:error?.response?.data?.message,
                myopen:true
              });
          });
    },[search, page])

    const handleClick = (evt,uid) => {
        history('/details/'+uid);
    }

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const pageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div>
            <h1>Assets</h1>
            <Paper sx={{marginBottom:"10px", padding:"10px",height:"100px", display:"flex", alignItems:"center"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth  size="small"  onChange={handleChange} id="outlined-basic" label="Search" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={12} sx={{display:"flex", justifyContent:"center"}}>
                        <Pagination count={10} page={page} onChange={pageChange} color="primary" />
                    </Grid>
                </Grid>
            </Paper>
            <div style={{display:"flex",justifyContent:"center" }}>
            <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
                    {coins ? coins.map((item, index) => {
                        return (
                            <>
                             <ListItemButton onClick={(event) => handleClick(event,item?.uuid)}>
                                <ListItem alignItems="flex-start" >
                                    <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={item?.iconUrl} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item?.name}
                                        secondary={
                                            <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {item?.symbol}
                                            </Typography>
                                            
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
            </div>
            <AlertBar open={stateAlert.myopen} msg={stateAlert.msg} />
        </div>
    )
}

export default Home
