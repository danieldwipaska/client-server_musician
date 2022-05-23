const router = require('express').Router();
const Category = require('../models/Category');

//CREATE A CATEGORY
router.post('/', async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE A CATEGORY
router.post('/:id', (req, res) => {
  // res.render('join', {
  //   layout: 'layouts/main-layout',
  // });
});
module.exports = router;
