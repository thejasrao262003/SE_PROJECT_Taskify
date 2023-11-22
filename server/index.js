require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const logoutRoutes = require("./routes/logout");
const tasksRoutes = require("./routes/tasks");
const meetingRoutes = require("./routes/meetings")
const router = express.Router();
// database connection
connection();

module.exports = router;
// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/meetings", meetingRoutes);
const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));