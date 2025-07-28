import React, { useState } from 'react';
import '../../styles/adminannouncements.css';

const AdminAnnouncements = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('students');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    try {
      const response = await fetch('https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/admin/sendAnnouncement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message, audience }),
      });

      if (response.ok) {
        setStatus('Announcement sent successfully.');
        setTitle('');
        setMessage('');
        setAudience('students');
      } else {
        const data = await response.json();
        setStatus(`Error: ${data.message || 'Failed to send announcement.'}`);
      }
    } catch (err) {
      console.error('Error submitting announcement:', err);
      setStatus('Server error. Please try again later.');
    }
  };

  return (
    <div className="admin-announcements-container">
      <h2 className="admin-title">Create Announcement</h2>
      <form className="announcement-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <label>Audience</label>
        <select value={audience} onChange={(e) => setAudience(e.target.value)}>
          <option value="students">Students</option>
          <option value="parents">Parents</option>
          <option value="both">Both</option>
        </select>

        <button type="submit">Send Announcement</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default AdminAnnouncements;