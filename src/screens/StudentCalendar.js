import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, faCalendarWeek, faList, faPlus, 
  faBell, faSync, faSearch, faFilter, faChevronLeft, faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import './StudentCalendar.css';

const StudentCalendar = () => {
  // Mock data for demonstration
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Math Assignment Due',
      date: '2023-12-15',
      time: '23:59',
      type: 'assignment',
      course: 'Mathematics',
      description: 'Complete problems 1-20 from chapter 5'
    },
    {
      id: 2,
      title: 'Midterm Exam',
      date: '2023-12-20',
      time: '10:00',
      type: 'exam',
      course: 'Physics',
      description: 'Covers chapters 1-4'
    },
    {
      id: 3,
      title: 'Calculus Lecture',
      date: '2023-12-18',
      time: '09:00',
      type: 'class',
      course: 'Calculus I',
      description: 'Room 101, Dr. Smith'
    },
    {
      id: 4,
      title: 'University Workshop',
      date: '2023-12-22',
      time: '14:00',
      type: 'event',
      course: '',
      description: 'Career Development Workshop'
    },
    {
      id: 5,
      title: 'Study Group Meeting',
      date: '2023-12-19',
      time: '18:00',
      type: 'personal',
      course: '',
      description: 'Weekly study group for CS courses'
    }
  ]);

  const [personalEvents, setPersonalEvents] = useState([
    {
      id: 6,
      title: 'Personal Study Time',
      date: '2023-12-17',
      time: '20:00',
      type: 'personal',
      course: '',
      description: 'Review for upcoming exams'
    }
  ]);

  // State for UI controls
  const [currentView, setCurrentView] = useState('monthly');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'personal',
    course: '',
    description: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Math Assignment due tomorrow', read: false },
    { id: 2, message: 'Physics exam in 3 days', read: false }
  ]);

  // Get events for current month
  const getEventsForMonth = (year, month) => {
    const allEvents = [...events, ...personalEvents];
    return allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });
  };

  // Get events for current week
  const getEventsForWeek = (startDate) => {
    const allEvents = [...events, ...personalEvents];
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    
    return allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
  };

  // Get events for current day
  const getEventsForDay = (date) => {
    const allEvents = [...events, ...personalEvents];
    return allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Generate calendar days for monthly view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    // Days from previous month to show
    const prevMonthDays = firstDay.getDay();
    // Days from next month to show
    const nextMonthDays = 6 - lastDay.getDay();
    
    const days = [];
    
    // Previous month days
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date: date,
        isCurrentMonth: false,
        events: getEventsForDay(date)
      });
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date: date,
        isCurrentMonth: true,
        events: getEventsForDay(date)
      });
    }
    
    // Next month days
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date: date,
        isCurrentMonth: false,
        events: getEventsForDay(date)
      });
    }
    
    return days;
  };

  // Navigate to previous month/week/day
  const prevPeriod = () => {
    if (currentView === 'monthly') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else if (currentView === 'weekly') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1));
    }
  };

  // Navigate to next month/week/day
  const nextPeriod = () => {
    if (currentView === 'monthly') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else if (currentView === 'weekly') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1));
    }
  };

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new event
  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event = {
        ...newEvent,
        id: Date.now()
      };
      setPersonalEvents(prev => [...prev, event]);
      setNewEvent({
        title: '',
        date: '',
        time: '',
        type: 'personal',
        course: '',
        description: ''
      });
      setShowAddEvent(false);
    }
  };

  // Delete event
  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    setPersonalEvents(prev => prev.filter(event => event.id !== id));
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  // Filter events based on search and filter
  const filteredEvents = [...events, ...personalEvents].filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.course && event.course.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterType === 'all' || event.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  // Get event type color
  const getEventTypeColor = (type) => {
    switch (type) {
      case 'assignment': return '#2196f3'; // Blue
      case 'exam': return '#f44336'; // Red
      case 'class': return '#4caf50'; // Green
      case 'event': return '#ffeb3b'; // Yellow
      case 'personal': return '#9c27b0'; // Purple
      default: return '#9e9e9e'; // Grey
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Render monthly view
  const renderMonthlyView = () => {
    const days = generateCalendarDays();
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className="calendar-monthly">
        <div className="calendar-header">
          <div className="calendar-navigation">
            <button onClick={prevPeriod}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h3>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
            <button onClick={nextPeriod}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <button className="today-btn" onClick={goToToday}>Today</button>
        </div>
        
        <div className="calendar-grid">
          <div className="weekdays">
            {weekdays.map(day => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>
          <div className="days">
            {days.map((day, index) => (
              <div 
                key={index} 
                className={`day ${day.isCurrentMonth ? 'current-month' : 'other-month'}`}
              >
                <div className="day-number">{day.date.getDate()}</div>
                <div className="day-events">
                  {day.events.slice(0, 3).map(event => (
                    <div 
                      key={event.id} 
                      className="event-badge"
                      style={{ borderLeft: `3px solid ${getEventTypeColor(event.type)}` }}
                    >
                      <div className="event-time">{event.time}</div>
                      <div className="event-title">{event.title}</div>
                    </div>
                  ))}
                  {day.events.length > 3 && (
                    <div className="more-events">+{day.events.length - 3} more</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render weekly view
  const renderWeeklyView = () => {
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    
    const weekdays = days.map(day => day.toLocaleDateString('en-US', { weekday: 'short' }));
    const dates = days.map(day => day.getDate());
    
    return (
      <div className="calendar-weekly">
        <div className="calendar-header">
          <div className="calendar-navigation">
            <button onClick={prevPeriod}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h3>Week of {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</h3>
            <button onClick={nextPeriod}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <button className="today-btn" onClick={goToToday}>Today</button>
        </div>
        
        <div className="weekly-grid">
          <div className="weekdays">
            {weekdays.map((day, index) => (
              <div key={day} className="weekday">
                <div className="weekday-name">{day}</div>
                <div className="weekday-date">{dates[index]}</div>
              </div>
            ))}
          </div>
          <div className="week-events">
            {days.map((day, dayIndex) => {
              const dayEvents = getEventsForDay(day);
              return (
                <div key={dayIndex} className="day-column">
                  {dayEvents.map(event => (
                    <div 
                      key={event.id} 
                      className="event-item"
                      style={{ borderLeft: `3px solid ${getEventTypeColor(event.type)}` }}
                    >
                      <div className="event-time">{event.time}</div>
                      <div className="event-title">{event.title}</div>
                      {event.course && <div className="event-course">{event.course}</div>}
                      <div className="event-description">{event.description}</div>
                      {event.type === 'personal' && (
                        <button 
                          className="delete-btn" 
                          onClick={() => deleteEvent(event.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Render agenda view
  const renderAgendaView = () => {
    // Sort events by date
    const sortedEvents = [...filteredEvents].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    return (
      <div className="calendar-agenda">
        <div className="calendar-header">
          <h3>Upcoming Events</h3>
        </div>
        
        <div className="agenda-list">
          {sortedEvents.map(event => (
            <div 
              key={event.id} 
              className="agenda-item"
              style={{ borderLeft: `3px solid ${getEventTypeColor(event.type)}` }}
            >
              <div className="agenda-date">{formatDate(event.date)}</div>
              <div className="agenda-time">{event.time}</div>
              <div className="agenda-content">
                <div className="agenda-title">{event.title}</div>
                {event.course && <div className="agenda-course">{event.course}</div>}
                <div className="agenda-description">{event.description}</div>
              </div>
              {event.type === 'personal' && (
                <button 
                  className="delete-btn" 
                  onClick={() => deleteEvent(event.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render notifications
  const renderNotifications = () => {
    const unreadNotifications = notifications.filter(n => !n.read);
    
    return (
      <div className="notifications-panel">
        <h3>Notifications ({unreadNotifications.length})</h3>
        {unreadNotifications.map(notification => (
          <div key={notification.id} className="notification-item">
            <div className="notification-content">{notification.message}</div>
            <button 
              className="mark-read-btn" 
              onClick={() => markAsRead(notification.id)}
            >
              Mark as Read
            </button>
          </div>
        ))}
        {unreadNotifications.length === 0 && (
          <p className="no-notifications">No new notifications</p>
        )}
      </div>
    );
  };

  return (
    <div className="student-calendar-container">
      <div className="calendar-header-main">
        <h2>My Calendar</h2>
        <div className="header-actions">
          <button className="add-event-btn" onClick={() => setShowAddEvent(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add Event
          </button>
          <button className="sync-btn">
            <FontAwesomeIcon icon={faSync} /> Sync
          </button>
        </div>
      </div>

      {/* View Controls */}
      <div className="view-controls">
        <div className="view-buttons">
          <button 
            className={currentView === 'monthly' ? 'active' : ''} 
            onClick={() => setCurrentView('monthly')}
          >
            <FontAwesomeIcon icon={faCalendarAlt} /> Monthly
          </button>
          <button 
            className={currentView === 'weekly' ? 'active' : ''} 
            onClick={() => setCurrentView('weekly')}
          >
            <FontAwesomeIcon icon={faCalendarWeek} /> Weekly
          </button>
          <button 
            className={currentView === 'agenda' ? 'active' : ''} 
            onClick={() => setCurrentView('agenda')}
          >
            <FontAwesomeIcon icon={faList} /> Agenda
          </button>
        </div>
        
        <div className="search-filters">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <FontAwesomeIcon icon={faFilter} />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="assignment">Assignments</option>
              <option value="exam">Exams</option>
              <option value="class">Classes</option>
              <option value="event">Events</option>
              <option value="personal">Personal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Calendar Area */}
      <div className="calendar-main">
        <div className="calendar-content">
          {currentView === 'monthly' && renderMonthlyView()}
          {currentView === 'weekly' && renderWeeklyView()}
          {currentView === 'agenda' && renderAgendaView()}
        </div>
        
        <div className="calendar-sidebar">
          {renderNotifications()}
          
          <div className="legend">
            <h3>Event Types</h3>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#2196f3' }}></div>
              <span>Assignments</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#f44336' }}></div>
              <span>Exams</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#4caf50' }}></div>
              <span>Classes</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#ffeb3b' }}></div>
              <span>Events</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#9c27b0' }}></div>
              <span>Personal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Event</h3>
            <form onSubmit={(e) => { e.preventDefault(); addEvent(); }}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="time"
                    value={newEvent.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  name="type"
                  value={newEvent.type}
                  onChange={handleInputChange}
                >
                  <option value="personal">Personal</option>
                  <option value="assignment">Assignment</option>
                  <option value="exam">Exam</option>
                  <option value="class">Class</option>
                  <option value="event">Event</option>
                </select>
              </div>
              <div className="form-group">
                <label>Course (optional)</label>
                <input
                  type="text"
                  name="course"
                  value={newEvent.course}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddEvent(false)}>Cancel</button>
                <button type="submit">Add Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCalendar;
