const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.validateToken = async (req, res, next) => {
  try {
    let token;
    console.log(req.headers)
    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')) {
      // Add a console.log to see the entire authorization header
      
      // Make sure we're correctly splitting the string
      token = req.headers.authorization.split(' ')[1];
      
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Set user in request
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

 