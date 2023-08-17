import React, {useState} from 'react'
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import { NavLink } from 'react-router-dom';
const Header = () => {

  const [value, setValue] = useState(0)
  return ( 
    // #2779a7 backgroundColor
    <div>
      <AppBar
       sx={{backgroundColor: " #49c5b6"}} 
       position="sticky">
        <Toolbar>
          <NavLink to= '/'>
<Typography>
            <AutoStoriesIcon  sx={{fontSize : "2.5rem"}}/>
          </Typography>
          </NavLink>
          
          <Tabs 
            sx={{ml:"auto"}}
            indicatorColor="primary"
            textColor="inherit"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={NavLink} to = "/add" label="Add product" />
            <Tab LinkComponent={NavLink} to = "/books" label="Books" />
            <Tab LinkComponent={NavLink} to = "/about" label= 'About Us'/>
          
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
