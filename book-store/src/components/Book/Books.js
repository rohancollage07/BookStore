import React, { useEffect, useState } from 'react'
import './Book.css'
import axios from 'axios'
import AllBook from './AllBook'

const fetchHandler = async () => {
  return await axios.get(process.env.REACT_APP_URL).then((res) => res.data)
}
const Books = () => {
  const [books, setBooks] = useState()
  useEffect(() => {
    fetchHandler().then((data) => setBooks(data.books))
  }, [])
  // console.log(books);
  return (
    <div>
      <ul>
        {books &&
          books.map((book, i) => (
            <li className="book" key={i}>
              <AllBook book={book} />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Books
