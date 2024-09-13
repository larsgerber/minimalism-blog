"use strict";

const express = require('express');
const useragent = require('express-useragent');
const postRoutes = require('./routes/postRoutes');
const browserRoutes = require('./routes/browserRoutes');
const compression = require('compression');
const app = express();


// middleware
app.use(compression());
app.use(express.static('dist', { maxAge: 2592000000 }));
app.use(useragent.express());
app.use(express.json());


// view engine
app.set('view engine', 'ejs');

// browser routes
app.use('/', browserRoutes);

// post routes
app.use('/', postRoutes);

// 404
app.use((req, res) => {
    const data = { title: "Error 404" }
    res.status(404).render('errors/404', { data });
});

// 503
app.use((err, req, res, next) => {
    console.error("App crashed!")
    console.log("URL: " + req.url)
    console.log(err)
    const data = { title: "Error 503" }
    res.status(503).render('errors/503', { data })
});

// start server
app.listen((process.env.SERVER_PORT || 8080), () => {
    console.log("Server startet at http://localhost:" + (process.env.SERVER_PORT || 8080))
});
