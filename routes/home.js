const router = require('express').Router();
const Category = require('../models/Category');

//LANDING PAGE
router.get('/', (req, res) => {
  res.render('home', {
    layout: 'layouts/main-layout',
  });
});

//ENROLL A BAND
router.get('/join', async (req, res) => {
  try {
    const category = await Category.find();

    res.render('join', {
      layout: 'layouts/main-layout',
      categories: category,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//SUCCESSFUL TO ENROLL A BAND
router.get('/join/successful', (req, res) => {
  res.render('joinSuccessful', {
    layout: 'layouts/main-layout',
  });
});

module.exports = router;
