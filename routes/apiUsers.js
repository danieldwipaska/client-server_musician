// const router = require('express').Router();
// const User = require('../models/User');
// const verify = require('./verifyToken');

// //GET USER
// router.get('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const { password, ...others } = user._doc;
//     res.json(others);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
