import { Button } from '@mui/material'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    

    toast.success('Added to Cart ! Click to go Cart', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      onClick: () => {
        history('/cart'); 
      },
    });
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

       toast.success('Book deleted successfully! Refresh.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }



  return (
    <div className="book-card">
  <Link to={`/books/${_id}/singlebook`} className="book-image">
    <img src={image} alt={name} />
    <div className="image-overlay">
      <button onClick={AddtoSB}>View Details</button>
    </div>
  </Link>
  <div className="book-details">
    <article className="author">By {author}</article>
    <h3 className="book-title">{name}</h3>
    <p className="book-description">{description}</p>
    <div className="availability">Available quantities: {quantity}</div>
    <h2 className="price">Rs {price}</h2>
    <div className="actions">
      <Button
        className="update-button"
        LinkComponent={Link}
        to={`/books/${_id}/update`}
        
      >
        Update
      </Button>
      <Button className="delete-button" onClick={deleteHandler}>
        Delete
      </Button>
      <Button className="add-to-cart-button" onClick={addToCartHandler}>
        Add to Cart
      </Button>
    </div>
  </div>
</div>

  )
}

export default AllBook
