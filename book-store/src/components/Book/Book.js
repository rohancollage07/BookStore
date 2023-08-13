import { Button } from '@mui/material';
import React from 'react'

const Book = (props) => {
    const {_id, name, author, description, price, image, available} = props.book;

  return (
    <div>
        <img src={image} alt={name}/>
        <article>By {author}</article>
        <h3>{name}</h3>
        <p>{description}</p>
        <h1>{available}</h1>
        <h2>
        Rs {price}
        </h2>
        <Button>Update</Button>
        <Button>Delete</Button>

    </div>
  )
}

export default Book