const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const usersRoute = require('./routes/users');
const postsRoute = require("./routes/posts");

require("custom-env").env(process.env.NODE_ENV, "./config");

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded(extend = true));
app.use(express.json());
app.use("/api/users", usersRoute); 
app.use("/api/users/:id/posts", postsRoute); 


app.listen(process.env.PORT);

