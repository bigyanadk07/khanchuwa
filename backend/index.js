const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');


// import routes
const authRoutes = require('./routes/auth.route');
const bookmarkRoutes = require('./routes/bookmark.route');
const placeRoutes = require('./routes/place.route')

//auth middleware
const {validateToken} = require('./middleware/auth.middleware')

// Config Initialization
dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to Khanchuwa API');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

app.use(validateToken)
app.use('/api/bookmark', bookmarkRoutes)
app.use('/api/place', placeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;