const router = require("express").Router();
const Meeting = require("../models/meeting");

// Get all meetings
router.get("/", async (req, res) => {
  try {
    const meetings = await Meeting.find().exec();
    res.status(200).json(meetings);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Create a new meeting
router.post("/", async (req, res) => {
  try {
    const { Meeting_ID, Meeting_Name, Date, Platform, Meeting_link, Time } = req.body;

    if (!Meeting_ID || !Meeting_Name || !Date || !Platform || !Meeting_link || !Time) {
      return res.status(400).send({ message: "Incomplete meeting information" });
    }

    const newMeeting = new Meeting({
      Meeting_ID,
      Meeting_Name,
      Date,
      Platform,
      Meeting_link,
      Time,
    });

    await newMeeting.save();

    res.status(201).send({ message: "Meeting created successfully", meeting: newMeeting });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Delete a meeting by Meeting_ID
router.delete("/:meetingId", async (req, res) => {
  try {
    const { meetingId } = req.params;
    await Meeting.deleteOne({ Meeting_ID: meetingId });
    res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (error) {
    console.error("Error deleting meeting:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update meetings
router.post("/update", async (req, res) => {
  try {
    const updatedMeetings = req.body;

    await Promise.all(
      updatedMeetings.map(async (updatedMeeting) => {
        const { Meeting_ID, Date, Platform, Meeting_link, Time } = updatedMeeting;
        await Meeting.findOneAndUpdate({ Meeting_ID }, { Date, Platform, Meeting_link, Time });
      })
    );

    res.status(200).json({ message: 'Meetings updated successfully' });
  } catch (error) {
    console.error('Error updating meetings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
