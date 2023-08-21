import { Button, Typography, Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Book from "./Book/Book";
import './Book/Book.css'
import Sidebar from "./Sidebar";
const URL = "http://localhost:5000/books";
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
const Home = () => {
  
  const [books, setBooks] = useState();
  const [query, setQuery] = useState("")
useEffect(() => {
    fetchHandler().then((data) => setBooks(data.books));
    
  }, []);

  // const search = (data) =>{
  //   return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(query)));
  // };
  // console.log(books);
  return (
    <> 
    <div>
      {/* <Box display="flex" flexDirection="column" alignItems="center">
        <Button
          LinkComponent={Link}
          to="/books"
          sx={{ marginTop: 15, background: "#2779a7" }}
          variant="contained"
        >
          <Typography variant="h3">View All Books</Typography>
        </Button>
      </Box> */}
      <div className="searchBox">
         <Typography  margin={10} color={"white"} variant="h3">Search Any Book </Typography>
        <TextField  style={{ width: '500px' }} id="outlined-basic" label="Search Book" variant="outlined" onChange={(e) => setQuery(e.target.value)} />

      </div>
      <div>

        <ul>
          {query && (
            books &&
            books.filter(book => book.name.toLowerCase().includes(query) || book.author.toLowerCase().includes(query) || book
              .description.toLowerCase().includes(query))
              .map((book, i) => (
                <li className='book' key={i}>
                  <Book book={book} />
                </li>
              ))
          )}
        </ul>
      </div>

    </div></>
  );
};

export default Home;





