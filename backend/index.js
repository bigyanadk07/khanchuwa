const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// import routes
const authRoutes = require('./routes/auth.route');
const bookmarkRoutes = require('./routes/bookmark.route');
const placeRoutes = require('./routes/place.route')

dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookmark', bookmarkRoutes)
app.use('/api/place', placeRoutes);

// Default route
app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
