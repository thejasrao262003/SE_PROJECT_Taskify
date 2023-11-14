import React, { useState } from 'react';
import './styles.css';
import Navbar from '../navbar/navbar';
const MeetingPlanner = () => {
  const [meetings, setMeetings] = useState([]);
  const [newMeeting, setNewMeeting] = useState({
    date: '',
    platform: '',
    link: '',
    time: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting((prevMeeting) => ({ ...prevMeeting, [name]: value }));
  };

  const handleScheduleMeeting = () => {
    if (!newMeeting.date || !newMeeting.platform || !newMeeting.time) {
      alert('Please fill in all required fields (Date, Platform, Time).');
      return;
    }

    setMeetings((prevMeetings) => [...prevMeetings, newMeeting]);
    setNewMeeting({ date: '', platform: '', link: '', time: '' });
  };

  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div className="meeting-planner-container">
        <div className="meeting-form">
            <h2>Schedule a Meeting</h2>
            <label>
            Date:
            <input
                type="date"
                name="date"
                value={newMeeting.date}
                onChange={handleInputChange}
            />
            </label>
            <label>
            Platform:
            <input
                type="text"
                name="platform"
                value={newMeeting.platform}
                onChange={handleInputChange}
                placeholder="Online/Offline"
            />
            </label>
            <label>
            Link:
            <input
                type="text"
                name="link"
                value={newMeeting.link}
                onChange={handleInputChange}
            />
            </label>
            <label>
            Time:
            <input
                type="time"
                name="time"
                value={newMeeting.time}
                onChange={handleInputChange}
            />
            </label>
            <button onClick={handleScheduleMeeting}>Schedule Meeting</button>
        </div>

        <div className="meeting-list">
            <h2>Scheduled Meetings</h2>
            <ul>
            {meetings.map((meeting, index) => (
                <li key={index}>
                <strong>Date:</strong> {meeting.date} |{' '}
                <strong>Platform:</strong> {meeting.platform} |{' '}
                <strong>Link:</strong> {meeting.link} |{' '}
                <strong>Time:</strong> {meeting.time}
                </li>
            ))}
            </ul>
        </div>
        </div>
    </div>
  );
};

export default MeetingPlanner;
