const router = require('express').Router();
const Band = require('../models/Band');
const Category = require('../models/Category');
const verify = require('./verifyToken');

//CREATE A BAND LIST
router.post('/', verify, async (req, res) => {
  const newBand = new Band(req.body);
  try {
    const savedBand = await newBand.save();
    res.redirect('/join/successful');
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE A POST
// it should be a PUT
router.post('/:id', verify, async (req, res) => {
  try {
    const updatedBand = await Band.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        website: req.body.website,
        managerName: req.body.managerName,
        phone: req.body.phone,
        memberName: req.body.memberName,
        desc: req.body.desc,
        categories: req.body.categories,
        city: req.body.city,
        tools: req.body.tools,
        price: req.body.price,
      },
      { new: true }
    );
    res.redirect('/bandjoined');
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE A BAND LIST
router.post('/', verify, async (req, res) => {
  const newBand = new Band(req.body);
  try {
    const savedBand = await newBand.save();
    res.redirect('/join/successful');
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET BANDS BY CATEGORIES
router.get('/', verify, async (req, res) => {
  const catId = req.query.cat_id;
  try {
    const cats = await Category.find().sort({ name: 1 });
    const cat = await Category.findById(catId);
    const bands = await Band.find({
      categories: {
        $in: [cat.name],
      },
    });
    res.render('bandList', {
      layout: 'layouts/main-layout',
      bands: bands,
      user: req.validUser,
      cats: cats,
      catNow: cat.name,
      title: `Category: ${cat.name}`,
    });
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
