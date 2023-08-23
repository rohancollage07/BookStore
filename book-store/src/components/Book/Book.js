import { Button } from '@mui/material'
import React, { useState } from 'react'
import './Book.css'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// Import the useCart hook

const Book = (props) => {
  const { addToCart } = useCart() // Access the addToCart function from context
const [open, setOpen] = useState(false);
  const history = useNavigate()
  
  const addToCartHandler = () => {
    // Logic to prepare the book item to be added to the cart
    const bookItem = {
      _id,
      name,
      author,
      description,
      price,
      image,
      available,
      quantity,
      quantity_available
      // ... other relevant properties
    }

    addToCart(bookItem)  // Add the book item to the cart
    console.log(bookItem)
  setOpen(true);
  }

  const handleClose = () => {
    setOpen(false); // Close the confirmation dialog
  };

  const {
    _id,
    name,
    author,
    description,
    price,
    image,
    available,
    quantity,
    quantity_available
  } = props.book

  const deleteHandler = async () => {
    await axios
      .delete(`${process.env.REACT_APP_URL}/${_id}`)
      .then((res) => res.data)
      .then(() => history('/'))
      .then(() => history('/books'))
  }
  return (
    <div className="card">
      <img
        src={image}
        alt={name}
        onClick={() => (window.location.href = `/books/${_id}`)}
      />
      {/* to go to certain location we used window.location.href */}
      <article>By {author}</article>
      <h3>{name}</h3>
      <p>{description}</p>
      <h1>Available quantities : {quantity}</h1>
     

      <h1>{available}</h1>
      <h2>Rs {price}</h2>
      <div className="UPDEl" style={{ padding: '20px' }}>
        <Button
          style={{ color: 'aliceblue' }}
          LinkComponent={Link}
          to={`/books/${_id}/update`}
          sx={{ mt: 'auto' }}
        >
          Update
        </Button>
        <Button
          style={{ color: 'aliceblue' }}
          onClick={deleteHandler}
          sx={{ mt: 'auto' }}
        >
          Delete
        </Button>
        <Button
          style={{ color: 'aliceblue' }}
          onClick={addToCartHandler}
          sx={{ mt: 'auto' }}
        >
          Add to Cart
        </Button>

         <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book Added to Cart</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The book has been added to your cart. Do you want to go to your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button LinkComponent={NavLink} to="/cart">Yes</Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  )
}

export default Book
