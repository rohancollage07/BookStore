import { Button } from '@mui/material'

import './Book.css'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../context'

// Import the useCart hook

const AllBook = (props) => {
  const { addToCart, addtoSingleBook } = useGlobalContext() // Access the addToCart function from context

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
    // setOpen(true);
    const confirm = window.confirm("added to cart! Do you want to go to Cart ?")
    //window.confirm gives a boolean value if clicked yes or no( true false)
    if (confirm){
        history("/cart") 
        // use above code to go to cart page using history UseNavigate
    }
  }

  const AddtoSB = () =>{
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
    addtoSingleBook(bookItem)
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
     <Link to={`/books/${_id}/singlebook`}>
      <img
        src={image}
        alt={name}
        onClick={AddtoSB}
        
      />
     </Link>
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

export default AllBook
