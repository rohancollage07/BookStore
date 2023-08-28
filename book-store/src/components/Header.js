import React, { useState, useEffect } from 'react';
import { Typography, Tabs, Tab } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Main.css';


const Header = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 786);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      {!isSmallScreen ? (
        <Tabs
          className='Tabs_Header'
          centered
          // value={activeTab}
          onChange={handleTabChange}
        >
          <Tab
            className={`Tab_Individual ${activeTab === 0 ? 'active' : ''}`}
            component={NavLink}
            to="/add"
            label="Add product"
          />
          <Tab
            className={`Tab_Individual ${activeTab === 1 ? 'active' : ''}`}
            component={NavLink}
            to="/books"
            label="Books"
          />
          <NavLink to="/" onClick={setActiveTab} >
            <Typography>
              <AutoStoriesIcon sx={{ fontSize: '3rem', color: '#C2A792' }} />
            </Typography>
          </NavLink>
          <Tab
            className={`Tab_Individual ${activeTab === 3 ? 'active' : ''}`}
            component={NavLink}
            to="/cart"
            label="Cart"
          />
          <Tab
            className={`Tab_Individual ${activeTab === 4 ? 'active' : ''}`}
            component={NavLink}
            to="/about"
            label="About Us"
          />
        </Tabs>
      ) : (
        <Sidebar />
      )}
    </div>
  );
};

export default Header;
