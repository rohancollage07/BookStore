import { Typography, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import Book from './Book/AllBook'
import './Book/Book.css'

const fetchHandler = async () => {
  return await axios.get(process.env.REACT_APP_URL).then((res) => res.data)
}
const Home = () => {
  const [books, setBooks] = useState()
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchHandler().then((data) => setBooks(data.books))
  }, [])

  return (
    <>
      <div>
        <div className="searchBox">
          <Typography margin={10} color={'black'} variant="h3">
            Search Any Book{' '}
          </Typography>
          <TextField
            style={{ width: '500px' }}
            id="outlined-basic"
            label="Search Book"
            variant="outlined"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div>
          <ul>
            {query &&
              books &&
              books
                .filter(
                  (book) =>
                    book.name.toLowerCase().includes(query) ||
                    book.author.toLowerCase().includes(query),
                )
                .map((book, i) => (
                  <li className="book" key={i}>
                    <Book book={book} />
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Home
