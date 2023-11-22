const router = require("express").Router();
const Discussion = require("../models/discussion"); // Update the import to use the discussion model

// Get all discussions
router.get("/", async (req, res) => {
  try {
    const discussions = await Discussion.find().exec();
    res.status(200).json(discussions);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Create a new discussion
router.post("/", async (req, res) => {
  try {
    const { Discussion_ID, From, To, Priority, Query } = req.body;

    if (!Discussion_ID || !From || !To || !Priority || !Query) {
      return res.status(400).send({ message: "Incomplete discussion information" });
    }

    const newDiscussion = new Discussion({
      Discussion_ID,
      From,
      To,
      Priority,
      Query,
    });

    await newDiscussion.save();

    res.status(201).send({ message: "Discussion created successfully", discussion: newDiscussion });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Delete a discussion by Discussion_ID
router.delete("/:discussionId", async (req, res) => {
  try {
    const { discussionId } = req.params;
    await Discussion.deleteOne({ Discussion_ID: discussionId });
    res.status(200).json({ message: "Discussion deleted successfully" });
  } catch (error) {
    console.error("Error deleting discussion:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update discussions
router.post("/update", async (req, res) => {
  try {
    const updatedDiscussions = req.body;

    await Promise.all(
      updatedDiscussions.map(async (updatedDiscussion) => {
        const { Discussion_ID, Priority } = updatedDiscussion;
        await Discussion.findOneAndUpdate({ Discussion_ID }, { Priority });
      })
    );

    res.status(200).json({ message: 'Discussions updated successfully' });
  } catch (error) {
    console.error('Error updating discussions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
