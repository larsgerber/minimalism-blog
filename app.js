const express = require('express');
const useragent = require('express-useragent');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');
const app = express();


// middleware
app.use(express.static('dist'));
app.use(useragent.express());
app.use(express.json());
dotenv.config();


// view engine
app.set('view engine', 'ejs');

// post routes
app.use('/', postRoutes);

// 500
app.use((err, req, res, next) => {
  const data = { title: "Error 503" }
  res.status(503).render('errors/503', { data })
});

// start server
app.listen(process.env.SERVER_PORT, () => {
  console.log("Server startet at http://localhost:" + process.env.SERVER_PORT)
});