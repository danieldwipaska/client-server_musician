const router = require('express').Router();
const Category = require('../models/Category');
const Band = require('../models/Band');
const Order = require('../models/Order');
const verify = require('./verifyToken');
const User = require('../models/User');

//LANDING PAGE
router.get('/', (req, res) => {
  res.render('landingPage', {
    layout: 'layouts/main-layout',
    user: {
      name: 'Welcome',
    },
    title: 'Join and Get your Guest Star',
  });
});

//LOGIN
router.get('/login', (req, res) => {
  res.render('login', {
    layout: 'layouts/main-layout',
    user: {
      name: 'Welcome',
    },
    title: 'Login',
  });
});

//REGISTER
router.get('/register', (req, res) => {
  res.render('register', {
    layout: 'layouts/main-layout',
    user: {
      name: 'Welcome',
    },
    title: 'Register',
  });
});

//REGISTER SUCCESSFUL
router.get('/register/successful', (req, res) => {
  res.render('registerSuccessful', {
    layout: 'layouts/main-layout',
    user: {
      name: 'Welcome',
    },
    title: 'Register Successful',
  });
});

//HOMEPAGE
router.get('/home', verify, (req, res) => {
  res.render('home', {
    layout: 'layouts/main-layout',
    user: req.validUser,
    title: 'Home',
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
      title: 'Join your Band',
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
      title: 'Band lists',
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
      title: band.name,
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
    title: 'Join successful',
  });
});

//ORDER
router.get('/band/:id/order', verify, async (req, res) => {
  try {
    const band = await Band.findById(req.params.id);
    res.render('order', {
      layout: 'layouts/main-layout',
      user: req.validUser,
      band: band,
      title: `Order ${band.name}`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//HISTORY
router.get('/history', verify, async (req, res) => {
  const status = req.query.status;
  if (status) {
    try {
      const orders = await Order.find({ username: req.validUser.name, status: status });
      let bands = [];
      for (let i = 0; i < orders.length; i++) {
        const band = await Band.findById(orders[i].bandId); // tidak bisa pakai forEach, ga tau kenapa
        bands.push(band);
      }
      res.render('historyPage', {
        layout: 'layouts/main-layout',
        user: req.validUser,
        bands: bands,
        title: 'History',
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.render('history', {
      layout: 'layouts/main-layout',
      user: req.validUser,
      title: 'History',
    });
  }
});

//JOINED BAND
router.get('/bandjoined', verify, async (req, res) => {
  try {
    const bands = await Band.find({ username: req.validUser.name });
    res.render('joinedBand', {
      layout: 'layouts/main-layout',
      bands: bands,
      user: req.validUser,
      title: 'Your Bands',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//EDIT A BAND
router.get('/band/:id/edit', verify, async (req, res) => {
  try {
    const band = await Band.findById(req.params.id);
    res.render('editBand', {
      layout: 'layouts/main-layout',
      user: req.validUser,
      band: band,
      title: `Edit ${band.name}`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
