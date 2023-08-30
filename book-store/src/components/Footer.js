import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
export const Footer = () => {
  return (
    <div className='footer'>
      <h1>Rohan Dongre</h1>
      <div className='social_media'>
    <a href='https://github.com/rohancollage07' target='_blank' rel='noopener noreferrer' >
       <GitHubIcon sx={{fontSize: '4rem', mr: '20px'}} />
    </a>
     <a href='https://www.linkedin.com/in/rohan-dongre/' target='_blank' rel='noopener noreferrer' >
       <LinkedInIcon sx={{fontSize: '4rem', ml: '20px'}}/>
    </a>
      </div>
      <div className='my_details'>
  
       <p>@Copyright 2023</p>
       <p>All rights reserved Made by Rohan Dongre </p>
      </div>
    </div>
  )
}
