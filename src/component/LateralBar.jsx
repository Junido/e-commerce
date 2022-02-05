import React, {useEffect, useState} from 'react'
import { ListItemIcon,Toolbar, Box, Drawer,ListItemText,List,ListItem} from '@mui/material';
import { FeedOutlined, ShowChartOutlined, PieChartOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function LateralBar(props) {

    const [size, SetSize] = useState(null);
    
    useEffect(() => {
        reportWindowSize();
    },[size])

    const  reportWindowSize = () => {
       
        SetSize(window.innerWidth);
    }

    window.addEventListener('resize', reportWindowSize);
    const drawer = (
        
        <Box sx={{ overflow: 'auto' }}>
            <List>
                <Link to="/" style={{ textDecoration: 'none', color:"inherit" }} >
                    <ListItem sx={{ marginTop:"10px"}} button key="Assets">
                        <ListItemIcon>
                            <PieChartOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Assets" />
                    </ListItem>
                </Link>
                <Link to="/Trade" style={{ textDecoration: 'none', color:"inherit" }} >
                    <ListItem sx={{ marginTop:"10px"}} button key="Trade">
                        <ListItemIcon>
                            <ShowChartOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Trade" />
                    </ListItem>
                </Link>
                <Link to="/News" style={{ textDecoration: 'none', color:"inherit" }} >
                    <ListItem sx={{ marginTop:"10px"}} button key="News">
                        <ListItemIcon>
                            <FeedOutlined />
                        </ListItemIcon>
                        <ListItemText primary="News" />
                    </ListItem>
                </Link>
            </List>
        </Box>
    )
    return (
        <Drawer
            variant = {size > 899 ? "permanent" : null }
            open={props.open}
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
