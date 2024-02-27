const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const usersRoute = require('./routes/users');
const tokenRoutes = require("./routes/tokens.js"); 

// if mistake in url, redirect to the correct one
app.get('/', (req, res) => {
  res.redirect('http://localhost:3000' + req.originalUrl);
});

//require("custom-env").env(process.env.NODE_ENV, "./config");
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
mongoose.connect("mongodb://localhost:27017/DB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", usersRoute); 
app.use("/api/tokens", tokenRoutes); 
//app.use("/api/users/:id/posts", postsRoute); 


app.listen(8080);

