const router = require('express').Router();
const Category = require('../models/Category');
const Band = require('../models/Band');
const verify = require('./verifyToken');

//LANDING PAGE
router.get('/', (req, res) => {
  res.render('landingPage', {
    layout: 'layouts/main-layout',
    user: {
      name: 'Welcome',
    },
  });
});

//LOGIN
router.get('/login', (req, res) => {
  res.render('login', {
    layout: 'layouts/main-layout',
    user: {
      name: 'Welcome',
    },
  });
});

//REGISTER
router.get('/register', (req, res) => {
  res.render('register', {
    layout: 'layouts/main-layout',
    user: {
      name: 'Welcome',
    },
  });
});

//REGISTER SUCCESSFUL
router.get('/register/successful', (req, res) => {
  res.render('registerSuccessful', {
    layout: 'layouts/main-layout',
    user: {
      name: 'Welcome',
    },
  });
});

//HOMEPAGE
router.get('/home', verify, (req, res) => {
  res.render('home', {
    layout: 'layouts/main-layout',
    user: req.validUser,
  });
});

//LIST A BAND
router.get('/join', verify, async (req, res) => {
  try {
    const category = await Category.find();

    res.render('join', {
      layout: 'layouts/main-layout',
      categories: category,
      user: req.validUser,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//ORDER A BAND
router.get('/band/lists', verify, async (req, res) => {
  try {
    const bands = await Band.find();
    const cats = await Category.find().sort({ name: 1 });
    res.render('bandList', {
      layout: 'layouts/main-layout',
      bands: bands,
      user: req.validUser,
      cats: cats,
      catNow: '',
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
      user: req.validUser,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//SUCCESSFUL TO ENROLL A BAND
router.get('/join/successful', verify, (req, res) => {
  res.render('joinSuccessful', {
    layout: 'layouts/main-layout',
    user: req.validUser,
  });
});

module.exports = router;
