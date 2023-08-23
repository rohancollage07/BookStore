import { Button } from '@mui/base'
import { FormLabel, TextField , Box, FormControlLabel, Checkbox, Typography} from '@mui/material'
import axios from 'axios'
import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Book/Book.css'

const AddBook = () => {
  const history = useNavigate()
  const [inputs, setInputs] = useState({
    name : "",
    description : "",
    price: "",
    author : "",
    image: "",
    quantity: "",
    quantity_available: ""
  })

  const [checked, setChecked] = useState()

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const sendRequest = async() => {
    axios.post(process.env.REACT_APP_URL, {
      name : String(inputs.name),
      author : String(inputs.author),
      description : String(inputs.description),
      price : Number(inputs.price),
      quantity : Number(inputs.quantity),
      quantity_available : Number(inputs.quantity_available)

      ,image : String(inputs.image),
      available : Boolean(checked)
    }).then(res => res.data)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, checked);
    sendRequest().then(() => history('/books'))
  }
  return <form onSubmit={handleSubmit}>
    <Box 
    display = 'flex'
    flexDirection = "column"
    justifyContent = {"center"}
    maxWidth = {700}
    alignContent={'center'}
    alignSelf="center"
    marginLeft={"auto"}
    marginRight="auto"
    marginTop={"100px"}

    >
    <Typography margin={2} variant='h5' align='center'>Add Book Details</Typography>
    <FormLabel>Name</FormLabel>
    <TextField value={inputs.name} onChange={handleChange} margin='normal' fullWidth variant='outlined' name='name'/>

    <FormLabel>Author</FormLabel>
    <TextField value={inputs.author} onChange={handleChange} margin='normal' fullWidth variant='outlined' name='author'/>

    <FormLabel>Description</FormLabel>
    <TextField value={inputs.description} onChange={handleChange} margin='normal' fullWidth variant='outlined' name='description'/>

<FormLabel>Image</FormLabel>
    <TextField value={inputs.image} onChange={handleChange} margin='normal' fullWidth variant='outlined' name='image'/>
    <FormControlLabel  control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />} label="Available" />

<FormLabel>Quantity</FormLabel>
    <TextField value={inputs.quantity} onChange={handleChange} type='number' margin='normal' fullWidth variant='outlined' name='quantity'/>

<FormLabel>quantity_available</FormLabel>
    <TextField value={inputs.quantity_available} onChange={handleChange} type='number' margin='normal' fullWidth variant='outlined' name='quantity_available'/>

    <FormLabel>Price</FormLabel>
    <TextField value={inputs.price} onChange={handleChange} type='number' margin='normal' fullWidth variant='outlined' name='price'/>

    {/* <FormLabel>Name</FormLabel>
    <TextField  margin='normal' fullWidth variant='outlined' name='name'/> */}
  <Button className='button-add' align='center' variant= "contained" type='submit'>Add Book</Button>
  </Box>
  </form>
}

export default AddBook