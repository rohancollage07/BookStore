import { Button, Typography, Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Book from "./Book/Book";
const URL = "http://localhost:5000/books";
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
const Home = () => {
  const keys = [ "name", 'author', 'description','price'] ;
  const [books, setBooks] = useState();
  const [query, setQuery] = useState("")
  // console.log(books.filter(book => book.name.toLowerCase().includes("p")));
useEffect(() => {
    fetchHandler().then((data) => setBooks(data.books));
  }, []);
  // console.log(books);
  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button
          LinkComponent={Link}
          to="/books"
          sx={{ marginTop: 15, background: "#2779a7" }}
          variant="contained"
        >
          <Typography variant="h3">View All Books</Typography>
        </Button>
      </Box>

      <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e) => setQuery(e.target.value)} />
      <div>
      <h1>hi</h1>
      <ul>
        {books &&
          books.filter(book => book.name.toLowerCase().includes(query)).map((book, i) => (
            <li className = 'book' key={i}>
              <Book book={book} />
            </li>
          ))}
      </ul>
    </div>
    
    </div>
  );
};

export default Home;