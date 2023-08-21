import { Button } from '@mui/material';
import React from 'react'
import './Book.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Book = (props) => {
  const history = useNavigate();
    const {_id, name, author, description, price, 
      image, available} = props.book;
      
  const deleteHandler = async() => {
   await axios.delete(`http://localhost:5000/books/${_id}`)
    .then(res => res.data).then(() => history("/")).then(() => history("/books"))
  }
  return (
    <div className='card'>
        <Button LinkComponent={Link} to = {`/books/${_id}`}> <img  src={image} alt={name}/></Button>
        <article>By {author}</article>
        <h3>{name}</h3>
        <p>{description}</p>
        <h1>{available}</h1>
        <h2>
        Rs {price}
        </h2>
        <div className='UPDEl' style={{padding: "20px"}}>
        <Button style={{color:'aliceblue'}}  LinkComponent={Link} to = {`/books/${_id}`}  sx = {{mt:"auto"}}>Update</Button>
        <Button style={{color:'aliceblue'}}   onClick={deleteHandler} sx = {{mt:"auto"}}>Delete</Button>

        </div>
        
    </div>
  )
}

export default Book