import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
const Header = () => {
  return (
    <div>
      <AppBar position="sticky">
       <Toolbar>
         <Typography>
            <AutoStoriesIcon />
            
        </Typography>
       </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
