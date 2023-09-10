import React, { useState, useEffect } from 'react'

import { useGlobalContext } from './context'
import './Main.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Cart = () => {
  const { cartItems, setCartItems } = useGlobalContext()
  const [totalAmount, setTotalAmount] = useState(0)

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

  const shopButtonHandler = async () => {
    try {
      // // Update quantities in the database for each item in cartItems
      // await Promise.all(cartItems.map(async item => {
      //   const newQuantity = quantity - item.quantity;
      //   await axios.patch(`${process.env.REACT_APP_URL}/${item._id}`, {
      //     quantity: newQuantity
      //   });
      // }));
      toast.success('Shopping Done Sucessfully !', {
      position: 'top-right',
      autoClose: 3000, // Notification will auto-close after 3 seconds
      onClose : () =>{
      setCartItems([])
      }
    })
      // Clear the cart or perform any other necessary actions
      
    } catch (error) {
      console.error('Error updating quantities:', error)
    }


  }

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
      </div>
      <button className="shop-button" onClick={shopButtonHandler}>
        Shop
      </button>
    </div>
  )
}

export default Cart
