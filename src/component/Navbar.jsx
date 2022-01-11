import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {Badge, Avatar, MenuItem, Menu, InputBase, Typography, IconButton, Box, AppBar, ListItemIcon,Toolbar,Divider,ListItemText,List,ListItem  }  from '@mui/material';
import { Mail, MoveToInbox, AccountCircle } from '@mui/icons-material';

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import logoRocket  from '../Rocket.gif';
import Tabs from '@mui/material/Tabs';
import LinkTab from '@mui/material/Tab';
import Tab from '@mui/material/Tab';
function Navbar(props) {

  const MenuClick = () => {
    props.setOpenMenu(props.openMenu ? false : true);
  }

  return (
    <Box sx={{ flexGrow: 1, p:3 }}>
      <AppBar id="header" className="navbar" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} >
        <Toolbar>
           <Avatar alt="Rocket" sx={{ width: 60, height: 60}} >
              <img src={logoRocket} width="150px" />
            </Avatar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', fontWeight: 'bold' } ,p:2.5 }}
          >
            Cryptocurrency
          </Typography>
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