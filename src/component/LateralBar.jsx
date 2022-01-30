import React, {useEffect, useState} from 'react'
import { ListItemIcon,Toolbar, Box, Drawer,Divider,ListItemText,List,ListItem} from '@mui/material';
import { Mail, MoveToInbox, BarChart, SsidChart, ShowChart } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function LateralBar({ open }) {

    const [size, SetSize] = useState(null);
    
    useEffect(() => {
        reportWindowSize();
    },[size])

    const  reportWindowSize = () => {
        console.log(window.innerWidth);
        SetSize(window.innerWidth);
    }

    window.addEventListener('resize', reportWindowSize);
    const drawer = (
        
        <Box sx={{ overflow: 'auto' }}>
            <List>
            {['Trade', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                 <Link to="/" >
                    <ListItem button key={text}>
                    <ListItemIcon>
                        {index % 2 === 0 ? <BarChart /> : <ShowChart />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                </Link>
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
            variant = {size > 899 ? "permanent" : null }
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
