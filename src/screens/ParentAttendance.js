import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaChartBar, FaClipboardList, FaArrowLeft } from 'react-icons/fa';
import './ParentDashboard.css';

// Mock data - Replace with actual API calls
const mockAttendanceData = {
  summary: {
    present: 45,
    absent: 5,
    late: 2,
    total: 52,
    percentage: 86.5,
    classAverage: 88.2
  },
  monthlyData: [
    { month: 'Jan', present: 20, absent: 2, late: 1 },
    { month: 'Feb', present: 18, absent: 1, late: 0 },
    { month: 'Mar', present: 19, absent: 1, late: 1 },
    { month: 'Apr', present: 21, absent: 0, late: 0 },
    { month: 'May', present: 20, absent: 1, late: 0 },
  ],
  recentAbsences: [
    { date: '2025-09-05', reason: 'Sick leave', status: 'Approved' },
    { date: '2025-08-15', reason: 'Family event', status: 'Approved' },
    { date: '2025-07-28', reason: 'Medical appointment', status: 'Approved' },
  ]
};

const ParentAttendance = () => {
  const [selectedChild, setSelectedChild] = useState(1); // Default to first child
  const [view, setView] = useState('summary'); // 'summary', 'monthly', 'request'
  const [absenceRequest, setAbsenceRequest] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    childId: 1
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAbsenceRequest(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitAbsence = (e) => {
    e.preventDefault();
    // In a real app, submit this to your backend
    console.log('Absence request submitted:', absenceRequest);
    alert('Absence request submitted successfully!');
    setAbsenceRequest({
      startDate: '',
      endDate: '',
      reason: '',
      childId: selectedChild
    });
    setView('summary');
  };

  const calculateAttendancePercentage = (present, total) => {
    return Math.round((present / total) * 100);
  };

  const { summary, monthlyData, recentAbsences } = mockAttendanceData;

  return (
    <div className="parent-dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <button onClick={() => navigate(-1)} className="back-button">
            <FaArrowLeft /> Back
          </button>
          <h1>Attendance</h1>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="attendance-tabs">
        <button 
          className={`tab-button ${view === 'summary' ? 'active' : ''}`}
          onClick={() => setView('summary')}
        >
          <FaClipboardList /> Summary
        </button>
        <button 
          className={`tab-button ${view === 'monthly' ? 'active' : ''}`}
          onClick={() => setView('monthly')}
        >
          <FaCalendarAlt /> Monthly View
        </button>
        <button 
          className={`tab-button ${view === 'request' ? 'active' : ''}`}
          onClick={() => setView('request')}
        >
          <FaClipboardList /> Request Absence
        </button>
      </div>

      {/* Summary View */}
      {view === 'summary' && (
        <div className="attendance-summary">
          <div className="stats-overview">
            <div className="stat-card">
              <h3>Present</h3>
              <div className="stat-value">{summary.present}</div>
              <div className="stat-label">Days</div>
            </div>
            <div className="stat-card absent">
              <h3>Absent</h3>
              <div className="stat-value">{summary.absent}</div>
              <div className="stat-label">Days</div>
            </div>
            <div className="stat-card late">
              <h3>Late Arrivals</h3>
              <div className="stat-value">{summary.late}</div>
              <div className="stat-label">Days</div>
            </div>
            <div className="stat-card total">
              <h3>Total Attendance</h3>
              <div className="stat-value">{summary.percentage}%</div>
              <div className="stat-label">Class Avg: {summary.classAverage}%</div>
            </div>
          </div>

          <div className="recent-absences">
            <h3>Recent Absences</h3>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAbsences.map((absence, index) => (
                    <tr key={index}>
                      <td>{new Date(absence.date).toLocaleDateString()}</td>
                      <td>{absence.reason}</td>
                      <td><span className={`status-badge ${absence.status.toLowerCase()}`}>{absence.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Monthly View */}
      {view === 'monthly' && (
        <div className="monthly-attendance">
          <h3>Monthly Attendance Overview</h3>
          <div className="attendance-bars">
            {monthlyData.map((monthData, index) => {
              const percentage = calculateAttendancePercentage(
                monthData.present, 
                monthData.present + monthData.absent + monthData.late
              );
              
              return (
                <div key={index} className="month-bar">
                  <div className="month-label">{monthData.month}</div>
                  <div className="bar-container">
                    <div 
                      className="attendance-bar" 
                      style={{ width: `${percentage}%` }}
                      title={`${percentage}% attendance`}
                    ></div>
                  </div>
                  <div className="month-stats">
                    <span className="present">{monthData.present}P</span>
                    <span className="absent">{monthData.absent}A</span>
                    <span className="late">{monthData.late}L</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="attendance-legend">
            <div><span className="legend-box present"></span> Present</div>
            <div><span className="legend-box absent"></span> Absent</div>
            <div><span className="legend-box late"></span> Late</div>
          </div>
        </div>
      )}

      {/* Request Absence */}
      {view === 'request' && (
        <div className="absence-request">
          <h3>Submit Absence Request</h3>
          <form onSubmit={handleSubmitAbsence} className="absence-form">
            <div className="form-group">
              <label>Child</label>
              <select 
                name="childId" 
                value={absenceRequest.childId}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value={1}>Alex Johnson (5th Grade)</option>
                <option value={2}>Sam Johnson (3rd Grade)</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Start Date</label>
              <input 
                type="date" 
                name="startDate" 
                value={absenceRequest.startDate}
                onChange={handleInputChange}
                className="form-control"
                required 
              />
            </div>
            
            <div className="form-group">
              <label>End Date</label>
              <input 
                type="date" 
                name="endDate" 
                value={absenceRequest.endDate}
                onChange={handleInputChange}
                className="form-control"
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Reason for Absence</label>
              <textarea 
                name="reason" 
                value={absenceRequest.reason}
                onChange={handleInputChange}
                className="form-control"
                rows="4"
                required
                placeholder="Please provide a reason for the absence..."
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setView('summary')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
            </div>
          </form>
          
          <div className="absence-policy">
            <h4>Absence Policy</h4>
            <ul>
              <li>Please submit absence requests at least 24 hours in advance when possible.</li>
              <li>For medical absences, please provide a doctor's note upon return.</li>
              <li>Excessive absences may require a meeting with school administration.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentAttendance;
