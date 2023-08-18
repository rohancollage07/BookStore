import React, { useState } from 'react';
import { IconButton, Drawer, List, ListItem, ListItemText, colors } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Create this CSS file for styling
import { red } from '@mui/material/colors';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };
  
    const list = () => (
        <div
            className="drawer"
            
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button component={Link} to="/add">
                    <ListItemText primary="Add Product" />
                </ListItem>
                <ListItem button component={Link} to="/books">
                    <ListItemText primary="Books" />
                </ListItem>
                <ListItem button component={Link} to="/about">
                    <ListItemText primary="About Us" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
        </div>
    );
};

export default Sidebar;
