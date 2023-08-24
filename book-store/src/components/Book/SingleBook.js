import React, { useEffect, useState } from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { useGlobalContext } from '../context';




const SingleBook = () => {
  const {book, setBook} = useGlobalContext(); // call the useGlobalContext
 

  const [value, setValue] = useState(1); // Initialize value with 1

  const handleDecrease = () => {
    if (value > 1) {
      setValue(value - 1); // Decrease value by 1, but keep it >= 1
    }
  };
  

  const handleIncrease = () => {
  // Find the corresponding book item
  const orignalValue = book.map(item => (
    item.quantity
  ))
  // Increase the input value by 1, but keep it within bounds
  if (value < orignalValue) {
    setValue(value + 1);
  }
};
  
//  useEffect(() => {
//     // Clear the book state when the component unmounts
//     return () => {
//       setBook([]);
//     };
//   }, [setBook]);
 

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
      <h1> Available Quantity : {singleBook.quantity}</h1>
      <h1>
            Add to cart quantity :
            <RemoveCircleIcon onClick={handleDecrease} />
            <input
              type="number"
              min="1"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
            <AddCircleSharpIcon onClick={handleIncrease} />
          </h1>
      
        </div>
      ))}

    </div>
  );


  
};

export default SingleBook;
