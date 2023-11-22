const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
  Discussion_ID: { type: String, required: true },
  From: { type: String, required: true },
  To: { type: String, required: true },
  Priority: { type: String, required: true },
  Query: { type:String, required: true},
});

const Discussion = mongoose.model("discussion", discussionSchema);
module.exports = Discussion;
