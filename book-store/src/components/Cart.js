import React, { useState, useEffect } from 'react';
import { useGlobalContext } from './context';
import './Main.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FormLabel,
  TextField,
  Box,
  Typography,
} from '@mui/material';

const Cart = () => {
  const { cartItems, setCartItems } = useGlobalContext();
  const [totalAmount, setTotalAmount] = useState(0);
  const history = useNavigate();

  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalAmount(total);
  }, [cartItems]);

  const increaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const removeItem = (itemId) => {
    const itemToDelete = cartItems.find((item) => item._id === itemId);
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);

    if (itemToDelete) {
      toast.success(`${itemToDelete.name} Deleted Successfully`, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const shopButtonHandler = async () => {
    try {
      const customerResponse = await axios.post(`${process.env.REACT_APP_URL}/Customer`, customerInfo);

      if (customerResponse.status === 200) {
        const customerId = customerResponse.data._id;

        const books = cartItems.map((item) => ({
          bookId: item._id,
          quantity: item.quantity,
        }));

        const orderResponse = await axios.post(`${process.env.REACT_APP_URL}/orders`, {
          customerId,
          books,
        });

        if (orderResponse.status === 200) {
          toast.success('Shopping Done Successfully!', {
            position: 'top-right',
            autoClose: 3000,
            onClose: () => {
              setCartItems([]);
              setCustomerInfo({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                address: '',
              });
              history('/cart');
            },
          });
        } else {
          console.error('Error creating order:', orderResponse);
        }
      } else {
        console.error('Error creating customer:', customerResponse);
      }
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
                    : cartItem
                );
                setCartItems(updatedCart);
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
        <form>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            maxWidth={700}
            alignContent="center"
            alignSelf="center"
            marginLeft="auto"
            marginRight="auto"
            marginTop="100px"
          >
            <Typography margin={2} variant="h5" align="center">
              Add Customer Details
            </Typography>

            {Object.entries(customerInfo).map(([key, value]) => (
              <div key={key}>
                <FormLabel>{key}</FormLabel>
                <TextField
                  value={value}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name={key}
                />
              </div>
            ))}

            <button className="shop-button" onClick={shopButtonHandler}>
              Shop
            </button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Cart;
