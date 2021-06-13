const express = require('express');
const cookieParser = require('cookie-parser');
const useragent = require('express-useragent');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');
const app = express();


// middleware
app.use(express.static('dist'));
app.use(useragent.express());
app.use(express.json());
app.use(cookieParser());
dotenv.config();


// view engine
app.set('view engine', 'ejs');

// post routes
app.use('/', postRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('errors/404')
});

// 500
app.use((err, req, res, next) => {
  res.status(503).render('errors/503')}
);

// start server
app.listen(process.env.SERVER_PORT, () => {
  console.log("Server startet at http://localhost:" + process.env.SERVER_PORT)
});