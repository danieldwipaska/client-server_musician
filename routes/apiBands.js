const router = require('express').Router();
const Band = require('../models/Band');

//CREATE A BAND LIST
router.post('/', async (req, res) => {
  const newBand = new Band(req.body);
  try {
    const savedBand = await newBand.save();
    res.redirect('/join/successful');
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE A BAND
router.post('/:id', (req, res) => {
  // res.render('join', {
  //   layout: 'layouts/main-layout',
  // });
});
module.exports = router;
