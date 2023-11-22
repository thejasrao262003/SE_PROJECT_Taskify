import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import your styles
import DiscussionForum from '../discussionForum/index';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">Your Logo</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Kanban</Link></li>
          <li><Link to="/meeting-planner">Meeting Planner</Link></li>
          <li><Link to="/discussion-forum" component={DiscussionForum}>Discussion Forum</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;