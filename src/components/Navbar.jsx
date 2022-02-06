import * as React from 'react';
import {Avatar,Typography, IconButton, Box, AppBar,Toolbar}  from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logoRocket  from '../Rocket.gif';
import { Link } from "react-router-dom";

function Navbar(props) {

  const MenuClick = () => {
    props.setOpenMenu(props.openMenu ? false : true);
  }

  return (
    <Box sx={{ flexGrow: 1, p:3 }}>
      <AppBar id="header" className="navbar" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} >
        <Toolbar>
           <Avatar alt="Rocket" sx={{ width: 60, height: 60,margin:"5px"}} >
                <Link to="/">
                  <img src={logoRocket} alt="logo Rocket" width="150px" />
                </Link>
          </Avatar>
          <Link  to="/" style={{ textDecoration: 'none', color:'#000' }}>
          <Typography

            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', fontWeight: 'bold'} ,p:2.5 }}
          >
            Cryptocurrency
          </Typography>
          </Link>
          <div className='btnMenu' >
            <IconButton  onClick={MenuClick} >
              <MenuIcon onClick={MenuClick}/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar