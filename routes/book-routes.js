const express = require('express');
const router = express.Router();
const Book = require ("../model/Book")

router.get('/', async (req,res,next) => {
    // this will provide all books
    let books;
    try {
        books = await Book.find();
        // res.json(books)
        
    } catch (err) {
        console.log(err) 
        // res.json(err)
    }

    if(!books){
        return res.status(404).json({message : "No products found"})

    }
    return res.status(200).json({books})
})


module.exports = router;









