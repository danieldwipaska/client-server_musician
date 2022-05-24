const router = require('express').Router();
const verify = require('./verifyToken');
const Order = require('../models/Order');

//CREATE AN ORDER
router.post('/', verify, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.render('orderSuccessful', {
      layout: 'layouts/main-layout',
      user: req.validUser,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
