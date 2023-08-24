import React from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { useGlobalContext } from '../context';




const SingleBook = () => {
  const {book} = useGlobalContext(); // call the useGlobalContext
 


  
console.log(book)
  return (
    <div>
      
     <h1>HEllo</h1>
      {book && book.map(singleBook => (
        <div key={singleBook._id}>
             <h3>{singleBook.name}</h3>
      <img src={singleBook.image} alt={singleBook.name}/>
      <h3>{singleBook.name}</h3>
      <article>By {singleBook.author}</article>
      <p>{singleBook.description}</p>
      <h2> Rs {singleBook.price}</h2>
      <h1>Available quantity : {singleBook.quantity}</h1>
      
      <RemoveCircleIcon/>  <input min="1" value={singleBook.quantity}></input> <AddCircleSharpIcon/>

        </div>
      ))}

    </div>
  );
};

export default SingleBook;
