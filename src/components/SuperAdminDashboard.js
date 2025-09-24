import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./SuperAdminDashboard.css";

const SuperAdminDashboard = () => {
  return (
    <div className="super-admin-dashboard">
      {/* 🔹 Header Banner */}
      <header className="welcome-banner">
        <h2>
          Welcome back, <span>Super Admin!</span>
        </h2>
        <p>
          Here’s what’s happening in your <span className="highlight">LMS</span>{" "}
          today 🚀
        </p>
      </header>

      {/* 🔹 Top Stats */}
      <section className="stats-section">
        <div className="stats-card blue">
          <div className="stats-header">
            <h4>Total Students</h4>
            <span className="trend">+12%</span>
          </div>
          <p className="value">1,240</p>
        </div>

        <div className="stats-card orange">
          <div className="stats-header">
            <h4>Teachers</h4>
            <span className="trend">+3%</span>
          </div>
          <p className="value">85</p>
        </div>

        <div className="stats-card purple">
          <div className="stats-header">
            <h4>Courses</h4>
            <span className="trend">+5%</span>
          </div>
          <p className="value">320</p>
        </div>

        <div className="stats-card green">
          <div className="stats-header">
            <h4>Active Users</h4>
            <span className="trend">+18%</span>
          </div>
          <p className="value">542</p>
        </div>

        <div className="stats-card teal">
          <div className="stats-header">
            <h4>Revenue</h4>
            <span className="trend">+9%</span>
          </div>
          <p className="value">$12,430</p>
        </div>
      </section>

      <div className="dashboard-grid">
        {/* 🔹 Left Side */}
        <div className="left-column">
          {/* Students Progress */}
          <div className="widget">
            <h3>📊 Students Progress</h3>
            <div className="progress-item">
              <span>Math</span>
              <div className="progress-bar">
                <div className="fill blue" style={{ width: "75%" }}></div>
              </div>
              <span>75%</span>
            </div>
            <div className="progress-item">
              <span>Science</span>
              <div className="progress-bar">
                <div className="fill green" style={{ width: "62%" }}></div>
              </div>
              <span>62%</span>
            </div>
            <div className="progress-item">
              <span>English</span>
              <div className="progress-bar">
                <div className="fill orange" style={{ width: "88%" }}></div>
              </div>
              <span>88%</span>
            </div>
          </div>

          {/* System Health */}
          <div className="widget">
            <h3>🖥️ System Health</h3>
            <ul className="health-list">
              <li className="ok">✅ Server Status: Running</li>
              <li className="ok">✅ Database: Connected</li>
              <li className="warn">⚠️ API Latency: Slight Delay</li>
              <li className="ok">✅ Backup: Active</li>
            </ul>
          </div>
        </div>

        {/* 🔹 Right Side */}
        <div className="right-column">
          {/* Calendar */}
          <div className="widget">
            <h3>📅 Calendar</h3>
            <Calendar />
          </div>

          {/* Quick Actions */}
          <div className="widget">
            <h3>⚡ Quick Actions</h3>
            <ul className="quick-actions">
              <li>➕ Add New Course</li>
              <li>👩‍🏫 Assign Teacher</li>
              <li>📢 Send Announcement</li>
              <li>🔒 Manage Security</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 🔹 Bottom Section */}
      <section className="widget">
        <h3>🕒 Recent Activities</h3>
        <table className="activity-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John D.</td>
              <td>Enrolled in Math</td>
              <td>2 hrs ago</td>
            </tr>
            <tr>
              <td>Mary K.</td>
              <td>Uploaded Assignment</td>
              <td>5 hrs ago</td>
            </tr>
            <tr>
              <td>Admin</td>
              <td>Approved Course</td>
              <td>1 day ago</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default SuperAdminDashboard;
