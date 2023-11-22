// MeetingPlanner.jsx

import React, { useState, useEffect } from 'react';
import './styles.css';
import Navbar from '../navbar/navbar';
import axios from 'axios';

const MeetingPlanner = () => {
  const [meetings, setMeetings] = useState([]);
  const [newMeeting, setNewMeeting] = useState({
    Meeting_ID: '',
    Meeting_Name: '',
    Date: '',
    Platform: '',
    Meeting_link: '',
    Time: '',
  });

  useEffect(() => {
    // Fetch meetings from the server when the component mounts
    fetchMeetings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting((prevMeeting) => ({ ...prevMeeting, [name]: value }));
  };

  const handleDeleteMeeting = async (meetingID) => {
    try {
      // Send a DELETE request to the server to delete the meeting
      await axios.delete(`http://localhost:8080/api/meetings/${meetingID}`);

      // Fetch meetings again to get the updated list after deletion
      await fetchMeetings();
    } catch (error) {
      console.error('Error deleting meeting:', error.message);
    }
  };

  const handleScheduleMeeting = async () => {
  if (!newMeeting.Meeting_Name || !newMeeting.Date || !newMeeting.Platform || !newMeeting.Time) {
    alert('Please fill in all required fields (Meeting Name, Date, Platform, Time).');
    return;
  }

  // Combine date and time to create a full date-time string
  const selectedDateTime = new Date(`${newMeeting.Date}T${newMeeting.Time}`);
  
  // Get the current date-time
  const currentDateTime = new Date();

  // Check if the selected date-time is greater than or equal to the current date-time
  if (selectedDateTime < currentDateTime) {
    alert('Please select a date and time greater than or equal to the current date and time.');
    return;
  }

  try {
    // Send a POST request to the server to save the meeting
    const response = await axios.post('http://localhost:8080/api/meetings', newMeeting);

    // Clear the form fields
    setNewMeeting({
      Meeting_ID: '',
      Meeting_Name: '',
      Date: '',
      Platform: '',
      Meeting_link: '',
      Time: '',
    });

    // Fetch meetings again to get the updated list
    await fetchMeetings();
  } catch (error) {
    console.error('Error scheduling meeting:', error.message);
  }
};

  const fetchMeetings = async () => {
    try {
      // Fetch meetings from the server
      const response = await axios.get('http://localhost:8080/api/meetings');
      // Update the local state with the fetched meetings
      setMeetings(response.data);
    } catch (error) {
      console.error('Error fetching meetings:', error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="meeting-planner-container">
        <div className="meeting-form">
          <h2>Schedule a Meeting</h2>
          <label>
            Meeting ID:
            <input
              type="text"
              name="Meeting_ID"
              value={newMeeting.Meeting_ID}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Meeting Name:
            <input
              type="text"
              name="Meeting_Name"
              value={newMeeting.Meeting_Name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="Date"
              value={newMeeting.Date}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Platform:
            <input
              type="text"
              name="Platform"
              value={newMeeting.Platform}
              onChange={handleInputChange}
              placeholder="Online/Offline"
            />
          </label>
          <label>
            Meeting Link:
            <input
              type="text"
              name="Meeting_link"
              value={newMeeting.Meeting_link}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="Time"
              value={newMeeting.Time}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={handleScheduleMeeting}>Schedule Meeting</button>
        </div>

        <div className="meeting-list">
  <h2>Scheduled Meetings</h2>
  <ul>
    {meetings.map((meeting) => (
      <li key={meeting.Meeting_ID} className="meeting-box">
        <strong>Meeting ID:</strong> {meeting.Meeting_ID} <br />
        <strong>Meeting Name:</strong> {meeting.Meeting_Name} <br />
        <strong>Date:</strong> {meeting.Date} <br />
        <strong>Platform:</strong> {meeting.Platform} <br />
        <strong>Meeting Link:</strong> {meeting.Meeting_link} <br />
        <strong>Time:</strong> {meeting.Time} <br />

        {/* Delete button */}
        <button onClick={() => handleDeleteMeeting(meeting.Meeting_ID)}>Delete</button>
      </li>
    ))}
  </ul>
</div>
      </div>
    </div>
  );
};

export default MeetingPlanner;
