const express = require('express');
const http = require('http');
const cors = require('cors');
const session = require('express-session'); // Import express-session
const passport = require('passport'); // Import passport
const connectDB = require('./config/db');
const productRoutes = require('./routes/products'); // Import product routes
const authRoutes = require('./routes/authRoutes');
const CartRoutes = require('./routes/cart');
const recommendationsRoutes= require ('./routes/recommendation');
const passportConfig = require('./config/passport'); // Import Passport configuration
const { server: wsServer } = require('./websocket/websocketServer'); // Import WebSocket server

const app = express();
const PORT = 8081;

// Connect to the database
connectDB();

// Create an HTTP server
const server = http.createServer(app);

// Integrate the WebSocket server with the HTTP server
wsServer.listen(PORT, () => {
  console.log(`WebSocket server is listening on ws://localhost:${PORT}`);
});

// Middleware and routes setup
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend's origin
  credentials: true // Allow credentials to be included
})); // Enable CORS
app.use(express.json());

// Session and Passport middleware setup
app.use(session({
  secret: 'your_secret_key', // Change this to a strong secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Initialize Passport and restore session
app.use(passport.initialize());
app.use(passport.session());

// Use Passport configuration
passportConfig();

// Set up routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', CartRoutes);
app.use('/api/recommendations',recommendationsRoutes);
// Define your routes here
app.get('/', (req, res) => {
  res.send('Express server is running');
});

// Start the HTTP server
server.listen(8080, () => {
  console.log(`HTTP server is running on port 8080`);
});

