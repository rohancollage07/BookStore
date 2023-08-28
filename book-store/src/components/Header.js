import React, { useState, useEffect } from 'react'
import { Typography, Tabs, Tab } from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import { NavLink } from 'react-router-dom'
import Sidebar from './Sidebar'
import './Main.css'


const Header = () => {
  
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [color, setColor] = useState('#C2A792')

  // Use Effect to handle screen size small to show menu icon
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 786)
    }

    // Initial check on component mount
    handleResize()

    // Attach event listener for window resize
    window.addEventListener('resize', handleResize)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div>

          {!isSmallScreen ? ( 
            // Only show tabs on larger screens
            <Tabs
            className='Tabs_Header'
            centered
            value={color}
            onChange={() => setColor('#2C1810')}
            >
              <Tab className='Tab_Individual' LinkComponent={NavLink} to="/add" label="Add product" />
              <Tab className='Tab_Individual' LinkComponent={NavLink} to="/books" label="Books" />
              <NavLink to="/" >
          <Typography  >
              <AutoStoriesIcon sx={{ fontSize: '3rem' }} />
            </Typography>
          </NavLink>
              <Tab className='Tab_Individual'  LinkComponent={NavLink} to="/cart" label="Cart" />
              <Tab className='Tab_Individual'  LinkComponent={NavLink} to="/about" label="About Us" />
            </Tabs>
          ) : (
            // Show sidebar icon on smaller screens
            
            <Sidebar />
          )}
        
      
    </div>
  )
}

export default Header
