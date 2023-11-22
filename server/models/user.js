// user.js

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// Define the user schema
const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Emp_ID: { type: String, required: true },
  Project_ID: { type: String, required: true },
  Role: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true },
});

// Method to generate authentication token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      Project_ID: this.Project_ID,
      Role: this.Role,
    },
    process.env.JWTPRIVATEKEY, // Use process.env to access environment variables
    {
      expiresIn: "7d",
    }
  );
  return token;
};

// Create the User model
const User = mongoose.model("user", userSchema);

// Validation function for user data
const validateUser = (data) => {
  const schema = Joi.object({
    Name: Joi.string().required().label("First Name"),
    Emp_ID: Joi.string().required().label("Employee ID"),
    Project_ID: Joi.string().required().label("Project ID"),
    Role: Joi.string().required().label("Role"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    status: Joi.string().required().label("Status"),
  });
  return schema.validate(data);
};

module.exports = { User, validateUser };
