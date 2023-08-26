import Header from "./components/Header";
// import './index.css'
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home"; 
import AddBook from './components/AddBook'
import About from './components/About'
import Books from './components/Book/Books'
import React from "react";
import UpdateBook from "./components/Book/UpdateBook";
import SingleBook from "./components/Book/SingleBook";
import Cart from "./components/Cart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        <Route path="/" element= {<Home/>} exact/>
        <Route path="/add" element= {<AddBook/>} exact />
        <Route path="/about" element= {<About/>} exact/>
        <Route path="/books" element= {<Books/>} exact/>
        <Route path="/books/:id/update" element= {<UpdateBook/>} exact/>  
        {/* here i have used /update to navigate same findbyid method to work for both bookdetails and singlebook */}
        <Route path="/books/:id/singlebook" element= {<SingleBook/>} exact/>
        <Route path="/cart" element= {<Cart/>} exact/>
      
      </Routes>
    </main>
    <ToastContainer />
  </React.Fragment>
}

export default App;


