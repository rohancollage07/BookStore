import React, { useEffect, useState } from 'react'
import { Link, Element } from 'react-scroll'
import './Main.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from './context'

const fetchHandler = async () =>{
  return await axios.get(process.env.REACT_APP_URL).then((res) => res.data)
}


const Home2 = () => {
  const {addToCart} = useGlobalContext()
  const [books, setBooks] = useState()
  const [value, setValue] = useState(1) // Initialize value with 1
  const [transitioned, setTransitioned] = useState(false);

  const history = useNavigate()

 

  useEffect( () => {
    fetchHandler().then((data) => setBooks(data.books.slice(0,4)))
  },[])


   
  const handleDecrease = () => {
    if (value > 1) {
      setValue(value - 1) // Decrease value by 1, but keep it >= 1
    }
  }

  const handleIncrease = (bookId) => {
    // Find the corresponding book item
   const selectedBook = books.find((singleBook) => singleBook._id === bookId);
    // Increase the input value by 1, but keep it within bounds
    if (value < selectedBook) {
      setValue(value + 1)
    }
  }

  const addToCartHandler = (bookId) => {
    const selectedBook = books.find((singleBook) => singleBook._id === bookId) // Replace bookId with the actual ID of the selected book
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

  useEffect(() => {
    // Add scroll event listener
    const handleScroll = () => {
      // Adjust the scroll position as needed
      const scrollThreshold = 300; // Adjust this value
      if (window.scrollY >= scrollThreshold) {
        setTransitioned(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="home2">
      {/* Navigation link */}
      <Link to="AllBooks" smooth={true} duration={500} >
        <h1 className="header-text">Discover, Devour, Delight!</h1>
      </Link>

      {/* Animated section */}
      <Element name="animated-section" className="animated-section">
        <div className="spine-container">
          <img
            src={process.env.PUBLIC_URL + '/images/I11.png'}
            alt="spine"
            className="animated-image"
          />
          <img
            src={process.env.PUBLIC_URL + '/images/I12.png'}
            alt="spine"
            className="animated-image"
          />
          <img
            src={process.env.PUBLIC_URL + '/images/I3.png'}
            alt="spine"
            className="animated-image"
          />
          <img
            src={process.env.PUBLIC_URL + '/images/I5.png'}
            alt="spine"
            className="animated-image"
          />
          <img
            src={process.env.PUBLIC_URL + '/images/I4.png'}
            alt="spine"
            className="animated-image_special"
          />
          <img
            src={process.env.PUBLIC_URL + '/images/I10.png'}
            alt="spine"
            className="animated-image"
          />
          <img
            src={process.env.PUBLIC_URL + '/images/I7.png'}
            alt="spine"
            className="animated-image"
          />
          <img
            src={process.env.PUBLIC_URL + '/images/I8.png'}
            alt="spine"
            className="animated-image"
          />

          <img
            src={process.env.PUBLIC_URL + '/images/I9.png'}
            alt="spine"
            className="animated-image"
          />
        </div>
        
      </Element>
      
     
      <Element name='AllBooks' >
        <div className={`two-books ${transitioned ? 'fade-in' : ''}`}>
        <h1 className='header-text'>All Books</h1>
         {books && 
          books.map((singleBook) => (
            
              <div key={singleBook._id} className="idd">
                
            <img
              className="image_book"
              src={singleBook.image}
              alt={singleBook.name}
            />
            <div className="books-2">
              <h3>{singleBook.name}</h3>
              <article>By {singleBook.author}</article>
              <p>{singleBook.description}</p>
              <h2>Rs {singleBook.price}</h2>
              <h1>Available Quantity: {singleBook.quantity}</h1>
              <div className="home_book_section">
                <h1 className="home_book_quantity">
                  Add Quantity:
                  <RemoveCircleIcon
                    className="home_book_iconss"
                    onClick={handleDecrease}
                  />
                  <input
                    className="quantity-input3"
                    type="number"
                    min="1"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                  />
                  <AddCircleSharpIcon
                    className="home_book_iconss"
                    onClick={handleIncrease}
                  />
                </h1>
              </div>
              <button
                className="home_book_buttonn"
                onClick={() => addToCartHandler(singleBook._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
          ))
        }
        
      </div>
      </Element>
       
    </div>
    
  )
}

export default Home2
