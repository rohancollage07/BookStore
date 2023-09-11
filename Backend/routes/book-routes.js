const express = require('express');
const router = express.Router();
const Book = require ("../model/Book")
const booksController = require("../controllers/books-controller");
const Customer = require('../model/Customer');
const customerController = require('../controllers/customers-controllers');



router.get('/', booksController.getAllBooks)
router.post('/', booksController.addBook)
router.get('/:id', booksController.getById)
router.patch('/:id', booksController.updateQuantity);

router.put("/:id" , booksController.updateBook)
router.delete("/:id" , booksController.deleteBook)

router.get('/Customer/details', customerController.getAllCustomers)
router.post('/Customer', customerController.addCustomer)


module.exports = router;









