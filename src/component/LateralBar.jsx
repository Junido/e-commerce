import React, { useState, useEffect } from 'react'
import { ListItemIcon,Toolbar, Box, Drawer,Divider,ListItemText,List,ListItem} from '@mui/material';
import { Mail, MoveToInbox } from '@mui/icons-material';
function LateralBar(props) {

    const {open} = props;

    return (
        <Drawer
            //variant={ window.screen.width < 900 ? "temporary" : "permanent"}
            open={open}
            sx={{
                width: 200,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box' },
            }}
            >
            <Toolbar />
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
        </Drawer>
    )
}

export default LateralBar
