
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import Book from './Book/AllBook'
// import './Book/Book.css'
import './Main.css'
import Home2 from './Home2'

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
      {/* style={{ backgroundColor: query ? '#F8F3ED' : '#252525' }} */}
      <div >
        <div className='search-container' >

          <input
          placeholder='search Book'
           type='text'
           className="searchBox"
          onChange={(e) => setQuery(e.target.value)}
           />
        </div>
       {query ? ( <div>
          <ul>
            {
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
        </div>) : (<Home2/>)}
      </div>
    </>
  )
}

export default Home
