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
const init = process.env.INITIALIZATION;
const net = require('net');

// Create a new TCP client
const client1 = new net.Socket();
const client2 = new net.Socket();
//client.setNoDelay(true);
// Connect to the TCP server
// client.connect(5555, '192.168.209.128', () => {
//     console.log('Connected to TCP server');

//     // Send a URL to the server
//     client.write('2 http://example.com');
// });

// let index = 0;
// function sendNextUrl() {
//   if (index < urls.length) {
//       console.log(`Sending URL to server: ${urls[index]}\0`);
//       client.write(`1 ${urls[index]}`);
//       index++;
//       setTimeout(sendNextUrl, 1000); // Wait for 1 second before sending the next URL
//   } else {
//       // All URLs have been sent, close the client
//       //client.destroy();
//   }
//}


client1.connect(5555, '192.168.209.128', () => {
  console.log('Connected to TCP server with client1');
  client1.write(`${init}\n`);

  // Close client1 after sending the initialization message
  client1.destroy();
});

client2.connect(5555, '192.168.209.128', () => {
  console.log('Connected to TCP server with client2');
  urls.forEach((url) => {
      console.log(`Sending URL to server: ${url}`);
      client2.write(`1 ${url}\n`);
  });
  client2.write("2 ofek\n");
});

// Handle data from the server
client2.on('data', (data) => {
    console.log('Received from server: ' + data);
    client.destroy();
});

// Handle close event
client2.on('close', () => {
    console.log('Connection closed');
});

// Handle error event
client2.on('error', (err) => {
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

