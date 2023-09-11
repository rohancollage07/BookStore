import React, { useState, useEffect } from 'react'
import { Button } from '@mui/base'
import { useGlobalContext } from './context'
import './Main.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import {  FormLabel,
  TextField,
  Box,
  Typography,} from '@mui/material'

const Cart = () => {
  const { cartItems, setCartItems } = useGlobalContext()
  const [totalAmount, setTotalAmount] = useState(0)
  const history = useNavigate()

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    
  })
 
    const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
 
//   const sendRequest = async () => {
//   axios
//     .post(`${process.env.REACT_APP_URL}/Customer`, { // Corrected the URL
//       firstName: String(inputs.firstName),
//       lastName: String(inputs.lastName),
//       email: String(inputs.email),
//       phoneNumber: Number(inputs.phoneNumber),
//       address: String(inputs.address)
//     })
//     .then((res) => res.data)
//     .catch((error) => {
//       // Handle any errors here
//       console.error('Error sending request:', error);
//     });
// }


//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   console.log(inputs);
//   await sendRequest(); // Wait for the sendRequest to complete
//   setInputs({ // Reset the form fields to empty values
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     address: '',
//   });
//   history('/cart'); // Navigate away from the cart page
// }


  useEffect(() => {
    // Calculate total amount whenever cartItems change
    let total = 0
    cartItems.forEach((item) => {
      total += item.price * item.quantity // Calculate total based on price and quantity
    })
    setTotalAmount(total)
    console.log(cartItems)
  }, [cartItems])
  

  const increaseQuantity = (itemId) => {
    // Find the item in cartItems
    const cartItemValue =
      cartItems.find((item) => item._id === itemId)?.quantity || 0
    console.log(cartItemValue)
    const updatedCart = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
    )
    setCartItems(updatedCart)
  }

  const decreaseQuantity = (itemId) => {
    // Find the item in cartItems
    const updatedCart = cartItems.map((item) =>
      item._id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    )
    setCartItems(updatedCart)
  }

  const removeItem = (itemId) => {
    const itemToDelete = cartItems.find((item) => item._id === itemId)
    const updatedCart = cartItems.filter((item) => item._id !== itemId)
    setCartItems(updatedCart)

    if (itemToDelete) {
      toast.success(`${itemToDelete.name} Deleted Successfully`, {
        position: 'top-right',
        autoClose: 3000, // Notification will auto-close after 3 seconds
      })
    }
  }

  // const shopButtonHandler = async () => {
  //   try {
  //     // // Update quantities in the database for each item in cartItems
  //     // await Promise.all(cartItems.map(async item => {
  //     //   const newQuantity = quantity - item.quantity;
  //     //   await axios.patch(`${process.env.REACT_APP_URL}/${item._id}`, {
  //     //     quantity: newQuantity
  //     //   });
  //     // }));
  //     toast.success('Shopping Done Sucessfully !', {
  //     position: 'top-right',
  //     autoClose: 3000, // Notification will auto-close after 3 seconds
  //     onClose : () =>{
  //     setCartItems([])
  //     }
  //   })
  //     // Clear the cart or perform any other necessary actions
      
  //   } catch (error) {
  //     console.error('Error updating quantities:', error)
  //   }


  // }

// Cart.js

const shopButtonHandler = async () => {
  try {
    // Create a customer first
    const customerResponse = 
    await axios.post(`${process.env.REACT_APP_URL}/Customer`, {
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      email: inputs.email,
      phoneNumber: inputs.phoneNumber,
      address: inputs.address,
    });

    console.log('Customer Response:', customerResponse);


    const customerId = customerResponse.data._id; // Assuming the customer ID is returned from the server
  console.log('idofcustomer',customerId);

    // Prepare book details (ID and quantity)
    const books = cartItems.map((item) => ({
      bookId: item._id,
      quantity: item.quantity,
    }));

     console.log('booksof order', books)
    // Create an order with customer ID and book details
    await axios.post(`${process.env.REACT_APP_URL}/orders`, {
      customerId,
      books,
    });

    toast.success('Shopping Done Successfully!', {
      position: 'top-right',
      autoClose: 3000,
      onClose: () => {
        setCartItems([]);
        setInputs({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          address: '',
        });
        history('/cart');
      },
    });
  } catch (error) {
    console.error('Error during checkout:', error);
  }
};



  return (
    <div className="cart-container">
      <h1 className="cart-header">Your Cart</h1>
      {cartItems.map((item) => (
        <div key={item._id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>Price: Rs {item.price}</p>
            <p>Available Quantity: {item.quantity}</p>
            <button
              className="remove-button"
              onClick={() => removeItem(item._id)}
            >
              Remove
            </button>
          </div>
          <div className="action-buttons">
            <input
              type="number"
              value={item.quantity}
              min="1"
              max={item.quantity_available}
              className="quantity-input"
              onChange={(e) => {
                const updatedCart = cartItems.map((cartItem) =>
                  cartItem._id === item._id
                    ? { ...cartItem, quantity: parseInt(e.target.value) }
                    : cartItem,
                )
                setCartItems(updatedCart)
              }}
            />
            <button
              className="action-button"
              onClick={() => increaseQuantity(item._id)}
            >
              +ADD
            </button>
            <button
              className="action-button"
              onClick={() => decreaseQuantity(item._id)}
            >
              -MINUS
            </button>
          </div>
        </div>
      ))}
      <h2 className="total-amount">Total Amount: Rs {totalAmount}</h2>
      <div>
        CODE HERE FOR CUStomer
        <form >
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
          Add Customer Details
        </Typography>
        
        <FormLabel>Name</FormLabel>
        <TextField
          value={inputs.firstName}
          onChange={handleChange}
          margin="normal"
          fullwidth
          variant="outlined"
          name="firstName"
        />

        <FormLabel>lastName</FormLabel>
        <TextField
          value={inputs.lastName}
          onChange={handleChange}
          
          margin="normal"
          fullwidth
          variant="outlined"
          name="lastName"
        />
        <FormLabel>email</FormLabel>
        <TextField
          value={inputs.email}
          onChange={handleChange}
          type='email'
          margin="normal"
          fullwidth
          variant="outlined"
          name="email"
        /><FormLabel>phoneNumber</FormLabel>
        <TextField
          value={inputs.phoneNumber}
          onChange={handleChange}
          type='text'
          inputProps={{ maxLength: 10 }}
          margin="normal"
          fullwidth
          variant="outlined"
          name="phoneNumber"
        /><FormLabel>address</FormLabel>
        <TextField
          value={inputs.address}
          onChange={handleChange}
          margin="normal"
          fullwidth
          variant="outlined"
          name="address"
        />
        

           {/* <Button
          className="button-addd"
          align="center"
          variant="contained"
        >
          Add Book
        </Button> */}
        <button className="shop-button"  onClick={shopButtonHandler}>
        Shop
      </button>

            </Box>
        </form>
      </div>
          
          
      {/* <button className="shop-button" onSubmit={handleSubmit} onClick={shopButtonHandler}>
        Shop
      </button> */}
    </div>
  )
}

export default Cart
