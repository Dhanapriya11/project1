import React from 'react';
import './AnalyticsInsights.css';

const AnalyticsInsights = () => {
  return (
    <div className="analytics-insights">
      <h1>Analytics & Insights</h1>
      <p>Visual dashboards showing trends in performance, engagement, and resource usage</p>
      
      <div className="analytics-actions">
        <button className="primary-button">Generate Analytics Report</button>
        <button className="secondary-button">Export Data</button>
      </div>
      
      <div className="analytics-charts">
        <div className="chart-container">
          <h2>User Engagement</h2>
          <div className="chart-placeholder">
            [User Engagement Chart]
          </div>
        </div>
        
        <div className="chart-container">
          <h2>Course Completion Rates</h2>
          <div className="chart-placeholder">
            [Course Completion Chart]
          </div>
        </div>
        
        <div className="chart-container">
          <h2>Resource Usage</h2>
          <div className="chart-placeholder">
            [Resource Usage Chart]
          </div>
        </div>
      </div>
      
      <div className="analytics-metrics">
        <div className="metric-card">
          <h3>Total Users</h3>
          <p className="metric-value">1,248</p>
        </div>
        <div className="metric-card">
          <h3>Active Courses</h3>
          <p className="metric-value">42</p>
        </div>
        <div className="metric-card">
          <h3>Avg. Session Duration</h3>
          <p className="metric-value">24 min</p>
        </div>
        <div className="metric-card">
          <h3>Content Views</h3>
          <p className="metric-value">12,450</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsInsights;