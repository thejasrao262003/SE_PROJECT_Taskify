const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  Meeting_ID: { type: String, required: true },
  Meeting_Name: { type: String, required: true },
  Date: { type: String, required: true },
  Platform: { type: String, required: true },
  Meeting_link: { type: String, required: true },
  Time: { type: String, required: true },
});

const Meeting = mongoose.model("meeting", meetingSchema);
module.exports = Meeting;
