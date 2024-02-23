const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
const custumeEnv= require('custom-env');
custumeEnv.env(process.env.NODE_ENV, './config');
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded(extend = true));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(Proccess.env.PORT);

