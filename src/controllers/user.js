import User from "../models/user.js";
import Joi from 'joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer';
import cloudinary from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dkjk0lyhn', 
  api_key: '731421237515219', 
  api_secret: 'OxwTL9WsqmscxdZNg1jKW2bMNY0' 
});
const userSchema = Joi.object({
  username: Joi.string().required(),
  phone: Joi.number().required(),
  address: Joi.string().optional(),
  iphone: Joi.string(),
  loanAmount: Joi.number().required()
});
export const createUser = async (req, res) => {
  try {
      // Validate dữ liệu đầu vào với Joi
      const { error } = userSchema.validate(req.body);
      if (error) {
          return res.status(400).send({
              message: "Validation error",
              error: error.details[0].message
          });
      }

      // Tạo user mới từ dữ liệu request
      const newUser = new User({
          username: req.body.username,
          phone: req.body.phone,
          address: req.body.address,
          iphone: req.body.iphone,
          loanAmount: req.body.loanAmount
      });

      // Lưu user mới vào database
      const savedUser = await newUser.save();

      res.status(201).send({
          message: "User created successfully",
          user: savedUser
      });
  } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).send({
          message: "An error occurred while creating the user",
          error: err.message
      });
  }
};


export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).send({
        message: "An error occurred while fetching users",
        error: err.message, // Include the error message for debugging
      });
    }
  };
  
export const deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).send({
          message: "User not found",
        });
      }
  
      res.status(200).send({
        message: "User deleted successfully",
        user: deletedUser,
      });
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).send({
        message: "An error occurred",
      });
    }
  };
  
export const getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({
          message: "User not found",
        });
      }
  
      res.status(200).send(user);
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).send({
        message: "An error occurred",
      });
    }
  };
  