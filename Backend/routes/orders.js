// routes/orders.js

const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders-controller');

// Create a new order
router.post('/', ordersController.createOrder);

module.exports = router;

