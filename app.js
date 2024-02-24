const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const usersRoute = require('./routes/users');


//require("custom-env").env(process.env.NODE_ENV, "./config");

mongoose.connect("mongodb://localhost:27017/DB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", usersRoute); 
//app.use("/api/users/:id/posts", postsRoute); 


app.listen(8080);

