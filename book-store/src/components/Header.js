import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Main.css';

const Header = () => {
  const [value, setValue] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 786);
    };

    // Initial check on component mount
    handleResize();

    // Attach event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <AppBar sx={{ backgroundColor: '#222222' }} position="sticky">
        <Toolbar sx={{justifyContent: "space-between"}}>
          <NavLink to="/">
            <Typography>
              <AutoStoriesIcon sx={{ fontSize: '2.5rem' }} />
            </Typography>
          </NavLink>

          {!isSmallScreen ? ( // Only show tabs on larger screens
            <Tabs
              sx={{ ml: 'auto' }}
             
              indicatorColor="primary"
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab LinkComponent={NavLink} to="/add" label="Add product" />
              <Tab LinkComponent={NavLink} to="/books" label="Books" />
              <Tab LinkComponent={NavLink} to="/cart" label="Cart" />
              
              <Tab LinkComponent={NavLink} to="/about" label="About Us" />
            </Tabs>
          ) : (
            // Show sidebar icon on smaller screens
            <Sidebar/>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
