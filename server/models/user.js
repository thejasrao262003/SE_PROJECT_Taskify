const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	Name: { type: String, required: true },
	Emp_ID: { type: String, required: true },
	Project_ID: { type: String, required: true },
	Role: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	status: {type: String, required: true},
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		Name: Joi.string().required().label("First Name"),
		Emp_ID: Joi.string().required().label("Employee ID"),
		Project_ID: Joi.string().required().label("Project ID"),
		Role: Joi.string().required().label("Role"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		status: Joi.string().required().label("status"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };