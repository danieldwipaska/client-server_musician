const router = require('express').Router();
const Category = require('../models/Category');
const Band = require('../models/Band');
const verify = require('./verifyToken');

//LANDING PAGE
router.get('/', (req, res) => {
  res.render('landingPage', {
    layout: 'layouts/main-layout',
  });
});

//LOGIN
router.get('/login', (req, res) => {
  res.render('login', {
    layout: 'layouts/main-layout',
  });
});

//REGISTER
router.get('/register', (req, res) => {
  res.render('register', {
    layout: 'layouts/main-layout',
  });
});

//REGISTER
router.get('/register/successful', (req, res) => {
  res.render('registerSuccessful', {
    layout: 'layouts/main-layout',
  });
});

//HOMEPAGE
router.get('/home', verify, (req, res) => {
  res.render('home', {
    layout: 'layouts/main-layout',
  });
});

//LIST A BAND
router.get('/join', verify, async (req, res) => {
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

//ORDER A BAND
router.get('/band/lists', verify, async (req, res) => {
  try {
    const bands = await Band.find();
    res.render('bandList', {
      layout: 'layouts/main-layout',
      bands: bands,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//BAND PROFILE
router.get('/band/:id', verify, async (req, res) => {
  const { id } = req.params;
  try {
    const band = await Band.findById(id);
    res.render('profile', {
      layout: 'layouts/main-layout',
      band: band,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//SUCCESSFUL TO ENROLL A BAND
router.get('/join/successful', verify, (req, res) => {
  res.render('joinSuccessful', {
    layout: 'layouts/main-layout',
  });
});

module.exports = router;
