import React, { useState } from 'react'
import { IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import './Main.css' // Create this CSS file for styling

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setIsOpen(open)
  }

  const list = () => (
    <div
      className="drawer"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} to="/add">
          <ListItemText primary="Add Product" />
        </ListItem>
        <ListItem component={Link} to="/books">
          <ListItemText primary="Books" />
        </ListItem>
        <ListItem component={Link} to="/about">
          <ListItemText primary="About Us" />
        </ListItem>

        <ListItem component={Link} to="/cart">
          <ListItemText primary="Cart" />
        </ListItem>
      </List>
    </div>
  )

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        size='200px'
        
        sx={{margin: 'auto'}}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  )
}

export default Sidebar
