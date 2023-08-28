import { Button } from '@mui/base'
import {
  FormLabel,
  TextField,
  Box,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Book/Book.css'

const AddBook = () => {
  const history = useNavigate()
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    price: '',
    author: '',
    image: '',
    quantity: '',
    quantity_available: '',
  })


  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const sendRequest = async () => {
    axios
      .post(process.env.REACT_APP_URL, {
        name: String(inputs.name),
        author: String(inputs.author),
        description: String(inputs.description),
        price: Number(inputs.price),
        quantity: Number(inputs.quantity),
        quantity_available: Number(inputs.quantity_available),

        image: String(inputs.image),
       
      })
      .then((res) => res.data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    sendRequest().then(() => history('/books'))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={'center'}
        maxWidth={700}
        alignContent={'center'}
        alignSelf="center"
        marginLeft={'auto'}
        marginRight="auto"
        marginTop={'100px'}
        
      >
        <Typography margin={2} variant="h5" align="center">
          Add Book Details
        </Typography>
        <FormLabel>Name</FormLabel>
        <TextField
          value={inputs.name}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="name"
        />

        <FormLabel>Author</FormLabel>
        <TextField
          value={inputs.author}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="author"
        />

        <FormLabel>Description</FormLabel>
        <TextField
          value={inputs.description}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="description"
        />

        <FormLabel>Image</FormLabel>
        <TextField
          value={inputs.image}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="image"
        />
        

        <FormLabel>Quantity</FormLabel>
        <TextField
          value={inputs.quantity}
          onChange={handleChange}
          type="number"
          margin="normal"
          fullWidth
          variant="outlined"
          name="quantity"
        />

      

        <FormLabel>Price</FormLabel>
        <TextField
          value={inputs.price}
          onChange={handleChange}
          type="number"
          margin="normal"
          fullWidth
          variant="outlined"
          name="price"
          
        />
        {/* Add other form fields here with appropriate styling */}

        <Button
          className="button-addd"
          align="center"
          variant="contained"
          type="submit"
        >
          Add Book
        </Button>
      </Box>
    </form>
  )
}

export default AddBook
