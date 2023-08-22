import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';

const SingleBook = () => {
  const [book, setBook] = useState(null); // Initialize with null
  // const [result, setResult] = useState(0);
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get
        (`${process.env.REACT_APP_URL}/${id}`);
        const data = response.data; 
        setBook(data.book);
        // Assuming the response contains the whole book object
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchHandler();
    
  }, [id]);

  if (book === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
      <h3>{book.name}</h3>
      <img src={book.image} alt={book.name}/>
      <h3>{book.name}</h3>
      <article>By {book.author}</article>
      <p>{book.description}</p>
      <h2> Rs {book.price}</h2>
      <h1>Available quantity : {book.quantity}</h1>
      <RemoveCircleIcon/>  <input></input> <AddCircleSharpIcon/>
    </div>
  );
};

export default SingleBook;
