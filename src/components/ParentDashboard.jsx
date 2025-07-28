import React, { useEffect, useState } from 'react';
import '../styles/parentdashboard.css';
import '../styles/BudgetPlanner.css';
import StudentProgressCard from './StudentProgressCard';
import BudgetPlanner from './BudgetPlanner';
import { Auth } from 'aws-amplify';

const ParentDashboard = () => {
  const [parentName, setParentName] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchUserAndNotifications = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userEmail = user.attributes.email;
        setParentName(user.attributes.name || 'Parent');

        const response = await fetch(
          `https://1t529kitz3.execute-api.us-east-1.amazonaws.com/dev/getParentNotifications?userId=${userEmail}`
        );

        if (response.ok) {
          const data = await response.json();
          const activeNotifications = data.filter((n) => !n.dismissed);
          setNotifications(activeNotifications);
        } else {
          console.error('Failed to load notifications.');
        }
      } catch (err) {
        console.error('Auth or fetch error:', err);
      }
    };

    fetchUserAndNotifications();
  }, []);

  const dismissNotification = async (notification) => {
    try {
      await fetch("https://1t529kitz3.execute-api.us-east-1.amazonaws.com/dev/dismissNotification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: notification.userId,
          timestamp: notification.timestamp
        })
      });

      setNotifications((prev) =>
        prev.filter((n) => n.timestamp !== notification.timestamp)
      );
    } catch (err) {
      console.error('Dismiss failed:', err);
    }
  };

  return (
    <div className="parent-dashboard">
      <aside className="sidebar-parent">
        <h3>FuturePath</h3>
        <ul>
          <li>Dashboard</li>
          <li>Budget Planner</li>
          <li>Notifications</li>
        </ul>
      </aside>

      <main className="parent-main-content">
        <header className="header-parent">
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>
            <span>Welcome, {parentName}</span>
            <div className="notification-bell" style={{ position: 'relative' }}>
              <button onClick={() => setShowDropdown(prev => !prev)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                🔔
              </button>
              {showDropdown && notifications.length > 0 && (
                <div className="notification-dropdown" style={{
                  position: 'absolute',
                  top: '30px',
                  right: '0',
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  width: '250px',
                  zIndex: 1000
                }}>
                  <ul style={{ listStyle: 'none', padding: '10px', margin: 0 }}>
                    {notifications.map(notification => (
                      <li key={notification.timestamp} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                        <span>{notification.message}</span>
                        <button
                          onClick={() => dismissNotification(notification)}
                          style={{ marginLeft: '10px', cursor: 'pointer', fontSize: '0.8rem' }}
                        >
                          Dismiss
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="dashboard-section">
          <h2 className="dashboard-title">Student Progress Overview</h2>
          <StudentProgressCard />
        </section>

        <section className="dashboard-section">
          <h2 className="dashboard-title">Budget & Savings Planner</h2>
          <BudgetPlanner />
        </section>

        <section className="dashboard-section">
          <h2 className="dashboard-title">Notifications</h2>
          {notifications.length === 0 ? (
            <p>No new notifications.</p>
          ) : (
            <ul>
              {notifications.map((notification) => (
                <li key={notification.timestamp} style={{ marginBottom: '10px' }}>
                  {notification.message}
                  <button
                    onClick={() => dismissNotification(notification)}
                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                  >
                    Dismiss
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default ParentDashboard;
