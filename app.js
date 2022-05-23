const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();
const mongoose = require('mongoose');

//IMPORT ROUTES
const homeRoute = require('./routes/home');

//IMPORT API ROUTES
const bandRoute = require('./routes/apiBands');
const categoryRoute = require('./routes/apiCategory');

//MIDDLEWARES
app.use(expressLayouts);
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(`${__dirname}/public`)); // make files able to access
app.use('/public', express.static(path.join(__dirname, 'public')));

//MONGOOSE CONNECT
// Mongodb Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('connected to DB!'))
  .catch((err) => {
    console.log(err);
  });

//ROUTES
app.use('/', homeRoute);
app.use('/api/bands', bandRoute);
app.use('/api/categories', categoryRoute);

//LISTEN
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
