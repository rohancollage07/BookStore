import React, { useState } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import { useGlobalContext } from '../context'
import '../Main.css' // Import your custom stylesheet
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const SingleBook = () => {
  const { book, addToCart } = useGlobalContext() // call the useGlobalContext
  const [value, setValue] = useState(1) // Initialize value with 1
  const history = useNavigate()
  
  const handleDecrease = () => {
    if (value > 1) {
      setValue(value - 1) // Decrease value by 1, but keep it >= 1
    }
  }

  const handleIncrease = () => {
    // Find the corresponding book item
    const orignalValue = book.map((item) => item.quantity)
    // Increase the input value by 1, but keep it within bounds
    if (value < orignalValue) {
      setValue(value + 1)
    }
  }

  const addToCartHandler = (bookId) => {
    const selectedBook = book.find((singleBook) => singleBook._id === bookId) // Replace bookId with the actual ID of the selected book
    if (selectedBook) {
      const cartItem = {
        id: selectedBook._id,
        name: selectedBook.name,
        price: selectedBook.price,
        quantity: value, // Use the current selected quantity
        image: selectedBook.image,
        // ... other relevant properties
      }
      addToCart(cartItem)
      console.log(cartItem)
      // Add any toast notification or navigation logic here
    }
    toast.success('Added to Cart ! Click to go Cart', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      onClick: () => {
        history('/cart')
      },
    })
  }
  // console.log(book);

  return (
    <div className="single-book-containerr">
      {book &&
        book.map((singleBook) => (
          <div key={singleBook._id} className="Book-Detailss">
            <img
              className="book-imagee"
              src={singleBook.image}
              alt={singleBook.name}
            />
            <div className="book-details-2">
              <h3>{singleBook.name}</h3>
              <article>By {singleBook.author}</article>
              <p>{singleBook.description}</p>
              <h2>Rs {singleBook.price}</h2>
              <h1>Available Quantity: {singleBook.quantity}</h1>
              <div className="add-to-cart-section">
                <h1 className="add-to-cart-quantity">
                  Add Quantity:
                  <RemoveCircleIcon
                    className="add-to-cart-iconss"
                    onClick={handleDecrease}
                  />
                  <input
                    className="quantity-input2"
                    type="number"
                    min="1"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                  />
                  <AddCircleSharpIcon
                    className="add-to-cart-iconss"
                    onClick={handleIncrease}
                  />
                </h1>
              </div>
              <button
                className="add-to-cart-buttonn"
                onClick={() => addToCartHandler(singleBook._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default SingleBook
