// DiscussionForum.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../navbar/navbar';
import './styles.css';

const DiscussionForum = () => {
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState({
    Discussion_ID: '',
    From: '',
    To: '',
    Priority: 'Low',
    Query: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/discussions')
      .then(response => {
        setDiscussions(response.data);
      })
      .catch(error => {
        console.error('Error fetching discussions:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDiscussion((prevDiscussion) => ({ ...prevDiscussion, [name]: value }));
  };

  const [error, setError] = useState("");

  const handleCreateDiscussion = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:8080/api/discussions";
      const response = await axios.post(url, newDiscussion);
      setDiscussions(response.data);

      // Reload the page after successfully creating a discussion
      window.location.reload();
    } catch (error) {
      console.error("Error creating discussion:", error);

      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
        console.error("Server response:", error.response.data);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }

    setNewDiscussion({
      Discussion_ID: "",
      From: "",
      To: "",
      Priority: "Low",
      Query: "",
    });
  };

  const handleDeleteDiscussion = async (discussionId) => {
    try {
      const url = `http://localhost:8080/api/discussions/${discussionId}`;
      await axios.delete(url);

      // Filter out the deleted discussion from the state
      const updatedDiscussions = discussions.filter((discussion) => discussion.Discussion_ID !== discussionId);
      setDiscussions(updatedDiscussions);
    } catch (error) {
      console.error("Error deleting discussion:", error);
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="discussion-forum-container">
        <h1>Discussion Forum</h1>
        <div className="discussion-container">
          <div className="discussion-list">
            {Array.isArray(discussions) && discussions.length > 0 ? (
              discussions.map((discussion) => (
                <div key={discussion.Discussion_ID} className="discussion">
                  <div>
                    <strong>Discussion ID:</strong> {discussion.Discussion_ID} <br />
                    <strong>From:</strong> {discussion.From} <br />
                    <strong>To:</strong> {discussion.To} <br />
                    <strong>Priority:</strong> {discussion.Priority} <br />
                    <strong>Query:</strong>
                    <div className="query-field">{discussion.Query}</div>
                  </div>
                  <button onClick={() => handleDeleteDiscussion(discussion.Discussion_ID)} className="delete-btn">
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No discussions available</p>
            )}
          </div>

          <div className="new-discussion-form">
            <h2>Create New Discussion</h2>
            <label>
              Discussion ID:
              <input
                type="text"
                name="Discussion_ID"
                value={newDiscussion.Discussion_ID}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              From:
              <input
                type="text"
                name="From"
                value={newDiscussion.From}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              To:
              <input
                type="text"
                name="To"
                value={newDiscussion.To}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              Priority:
              <select
                name="Priority"
                value={newDiscussion.Priority}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>
            <label>
              Query:
              <input
                type="textarea"
                name="Query"
                value={newDiscussion.Query}
                onChange={handleInputChange}
                className="textarea-field"
              />
            </label>
            {error && <div className="error-msg">{error}</div>}
            <button onClick={handleCreateDiscussion} className="create-btn">Create Discussion</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionForum;
