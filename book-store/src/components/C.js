import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useGlobalContext } from './context';


const Cart = () => {
  const { cartItems, setCartItems } = useGlobalContext();

  const [totalAmount, setTotalAmount] = useState(0);
  const [value, setValue] = useState(1); // Initialize value with 1
  
  useEffect(() => {
    // Calculate total amount whenever cartItems change
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity; // Calculate total based on price and quantity
    });
    setTotalAmount(total);
    console.log(cartItems)
  }, [cartItems]);

  const increaseQuantity = (itemId) => {
    // Find the item in cartItems
    const cartItemValue = cartItems.find(item => item._id === itemId)?.quantity || 0;
    console.log(cartItemValue)
    const updatedCart = cartItems.map(item =>
      item._id === itemId && item.quantity < cartItemValue
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
    
  };

  const decreaseQuantity = (itemId) => {
    // Find the item in cartItems
    const updatedCart = cartItems.map(item =>
      item._id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    
  };


 


  const shopButtonHandler = async () => {
    try {
      // // Update quantities in the database for each item in cartItems
      // await Promise.all(cartItems.map(async item => {
      //   const newQuantity = quantity - item.quantity;
      //   await axios.patch(`${process.env.REACT_APP_URL}/${item._id}`, {
      //     quantity: newQuantity
      //   });
      // }));

      // Clear the cart or perform any other necessary actions
      setCartItems([]);
    } catch (error) {
      console.error('Error updating quantities:', error);
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.map(item => (
        <div key={item._id}>
          <p>{item.name}</p>
          <p>Price: Rs {item.price}</p>
          <p>Available Quantity: {item.quantity}</p>
          <p>Quantity:</p>
          <input
            type="number"
            value={item.quantity}
            min="1"
            max={item.quantity_available}
            onChange={(e) => {
              const updatedCart = cartItems.map(cartItem =>
                cartItem._id === item._id
                  ? { ...cartItem, quantity: parseInt(e.target.value) }
                  : cartItem
              );
              setCartItems(updatedCart);
            }}
          />
          <button onClick={() => increaseQuantity(item._id)}>+ADD</button>
          <button onClick={() => decreaseQuantity(item._id)}>-MINUS</button>
        </div>
      ))}
      <h2>Total Amount: Rs {totalAmount}</h2>
      <button onClick={shopButtonHandler}>Shop</button>
    </div>
  );
}

export default Cart;
