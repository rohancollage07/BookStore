import { Box, Typography } from '@mui/material'
import React from 'react'

const About = () => {
  return (
    <div>
      <Box
        margin={15}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <Typography sx={{ fontFamily: 'fantasy' }} variant="h2">
          This is a CRUD Application
        </Typography>
        <Typography variant="h3">By Rohan Dongre</Typography>
      </Box>
    </div>
  )
}

export default About
