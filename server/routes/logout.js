const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.header("x-auth-token");

    // If no token is provided, handle the case accordingly
    if (!token) {
      return res.status(401).send({ message: "Unauthorized: No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get the user ID from the decoded token
    const userId = decoded._id;

    // Find the user by ID
    const user = await User.findById(userId);

    // If the user is not found, handle the case accordingly
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Set the status to "off" after successful logout
    user.status = "off";
    await user.save();

    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    // If the token is invalid or any other error occurs, handle it accordingly
    res.status(401).send({ message: "Unauthorized: Invalid token" });
  }
});

module.exports = router;
