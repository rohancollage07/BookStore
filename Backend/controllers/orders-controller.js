// controllers/orders-controller.js

const Order = require('../model/Order');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { customerId, books } = req.body;
    const order = new Order({ customerId, books });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

module.exports = { createOrder };
