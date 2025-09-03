const userModel = require('../models/userModel');
const { validateUser, validatePartialUser } = require('../utils/validation');

const userController = {
  // Get all users
  getAllUsers: (req, res) => {
    try {
      const users = userModel.getAllUsers();
      res.status(200).json({
        success: true,
        data: users,
        message: 'Users retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Get user by ID
  getUserById: (req, res) => {
    try {
      const user = userModel.getUserById(req.params.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: user,
        message: 'User retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Create new user
  createUser: (req, res) => {
    try {
      const { name, email, age } = req.body;
      
      // Validate input
      const validationErrors = validateUser({ name, email, age });
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validationErrors
        });
      }
      
      // Check if email already exists
      if (userModel.emailExists(email)) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }
      
      // Create new user
      const newUser = userModel.createUser({ name, email, age });
      
      res.status(201).json({
        success: true,
        data: newUser,
        message: 'User created successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Update user
  updateUser: (req, res) => {
    try {
      const { name, email, age } = req.body;
      
      // Validate input
      const validationErrors = validateUser({ name, email, age });
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validationErrors
        });
      }
      
      // Check if email already exists (excluding current user)
      if (userModel.emailExists(email, parseInt(req.params.id))) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }
      
      // Update user
      const updatedUser = userModel.updateUser(req.params.id, { name, email, age });
      
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: updatedUser,
        message: 'User updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Partially update user
  patchUser: (req, res) => {
    try {
      const { name, email, age } = req.body;
      
      // Validate input
      const validationErrors = validatePartialUser({ name, email, age });
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validationErrors
        });
      }
      
      // Check if email already exists (excluding current user)
      if (email && userModel.emailExists(email, parseInt(req.params.id))) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }
      
      // Prepare updates
      const updates = {};
      if (name !== undefined) updates.name = name.trim();
      if (email !== undefined) updates.email = email.trim().toLowerCase();
      if (age !== undefined) updates.age = parseInt(age);
      
      // Update user
      const updatedUser = userModel.patchUser(req.params.id, updates);
      
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: updatedUser,
        message: 'User updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Delete user
  deleteUser: (req, res) => {
    try {
      const deletedUser = userModel.deleteUser(req.params.id);
      
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: deletedUser,
        message: 'User deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
};

module.exports = userController;
