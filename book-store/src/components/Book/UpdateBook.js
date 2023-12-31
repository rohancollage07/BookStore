import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { FormLabel, TextField , Box, FormControlLabel, Checkbox, Button, Typography} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateBook = () => {
  const [inputs, setInputs] = useState({})
  const [checked, setChecked] = useState(false)
  const id = useParams().id;
  const history = useNavigate();
  useEffect(() => {
    const fetchHandler = async() =>{
        await axios.get(`${process.env.REACT_APP_URL}/${id}`)
        .then((res) => (res.data)).then(data => setInputs(data.book))
    
    };
    fetchHandler();
   
  }, [id]);

  const sendRequest = async() => {
    await axios.put(`${process.env.REACT_APP_URL}/${id}`, {
      name : String(inputs.name),
      author : String(inputs.author),
      description : String(inputs.description),
      price : Number(inputs.price)  
      ,image : String(inputs.image),
      quantity : Number(inputs.quantity),
      available : Boolean(checked)
    }).then(res => res.data)
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/books"))
  }
  
  const handleChange = (e) =>{
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  
  return (
    <div>
      {inputs && (  <form onSubmit={handleSubmit}>
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
    <Typography variant='h5' align='center'>Update Book Details</Typography>
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

    <FormLabel>Price</FormLabel>
    <TextField value={inputs.price} onChange={handleChange} type='number' margin='normal' fullWidth variant='outlined' name='price'/>

    
  <Button variant= "contained" type='submit'>Update Book</Button>
  </Box>
  </form>)}
    </div>
  )
}

export default UpdateBook