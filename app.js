const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const usersRoute = require('./routes/users');
const tokenRoutes = require("./routes/tokens.js"); 
const postsRoute = require("./routes/posts");

// if mistake in url, redirect to the correct one
// app.get('/', (req, res) => {
//   res.redirect('http://localhost:3000' + req.originalUrl);
// });

process.env.NODE_ENV = 'local';
const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');
const urls = process.env.CONNECTION_URL.split(',');
console.log(urls);
let index = 0;
const net = require('net');

// Create a new TCP client
const client = new net.Socket();
//client.setNoDelay(true);
// Connect to the TCP server
// client.connect(5555, '192.168.209.128', () => {
//     console.log('Connected to TCP server');

//     // Send a URL to the server
//     client.write('2 http://example.com');
// });
client.connect(5555, '192.168.209.128', () => {
  console.log('Connected to TCP server');

  // Send each URL to the server
  urls.forEach(url => {
      console.log(`Sending URL to server: ${url}`);
      client.write(`1 ${url}\n`);
  });
});
// Handle data from the server
client.on('data', (data) => {
    console.log('Received from server: ' + data);

    // Close the client after receiving data
    client.destroy();
});

// Handle close event
client.on('close', () => {
    console.log('Connection closed');
});

// Handle error event
client.on('error', (err) => {
    console.error('Error: ', err);
});
//require("custom-env").env(process.env.NODE_ENV, "./config");
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", usersRoute); 
app.use("/api/tokens", tokenRoutes); 
app.use("/api/posts", postsRoute);
//app.use("/api/users/:id/posts", postsRoute); 
const { fileURLToPath } = require('url');
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(process.env.PORT);

