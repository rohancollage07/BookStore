// Create a context to manage the cart state
import React, { createContext, useContext, useState } from 'react'

const App = createContext()

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [book, setBook] = useState([]) // of page SingleBook

  const addToCart = (item) => {
    setCartItems([...cartItems, item])
    
  }

  const addtoSingleBook = (item) => {
    setBook([item])
    localStorage.setItem('selectedBook', JSON.stringify(item));
  }

  return (
    <App.Provider
      value={{
        cartItems,
        addToCart,
        setCartItems,
        addtoSingleBook,
        book,
        setBook,
      }}
    >
      {children}
    </App.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(App)
}
