import React, { useState, useEffect } from 'react'
import { ListItemIcon,Toolbar, Box, Drawer,Divider,ListItemText,List,ListItem} from '@mui/material';
import { Mail, MoveToInbox } from '@mui/icons-material';
import Navbar from './Navbar';
function LateralBar(props) {

    const {open} = props;
    const  reportWindowSize = () => {
        console.log(window.innerWidth);
        return window.innerWidth;
    }

    window.addEventListener('resize', reportWindowSize);

    const drawer = (
        
        <Box sx={{ overflow: 'auto' }}>
            <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon>
                    {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
            <Divider />
            <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon>
                    {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
        </Box>
    )
       

    return (
        <Drawer
            variant={ "permanent" }
            open={open}
            sx={{
                width: 200,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box' },
            }}
            >
            <Toolbar />
            {drawer}
        </Drawer>
    )
}

export default LateralBar
