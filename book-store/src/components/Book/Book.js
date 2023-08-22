import { Button } from '@mui/material'
import React from 'react'
import './Book.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context'
// Import the useCart hook

const Book = (props) => {
  const { addToCart } = useCart() // Access the addToCart function from context

  const history = useNavigate()
  //  const history2 = unstable_HistoryRouter();
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
      // ... other relevant properties
    }

    addToCart(bookItem) // Add the book item to the cart
    console.log(bookItem)
  }

  const {
    _id,
    name,
    author,
    description,
    price,
    image,
    available,
    quantity,
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
      </div>
    </div>
  )
}

export default Book
