import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaCalendarCheck, 
  FaArrowLeft, 
  FaSearch, 
  FaFilter, 
  FaMapMarkerAlt,
  FaClock,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaList
} from 'react-icons/fa';
import './ParentStyles.css';

// Mock data - Replace with actual API calls
const mockEvents = [
  {
    id: 1,
    title: 'Parent-Teacher Conference',
    type: 'academic',
    date: '2025-09-15',
    startTime: '15:00',
    endTime: '18:00',
    location: 'School Main Building, Room 205',
    description: 'Meet with your child\'s teachers to discuss academic progress.',
    rsvp: { required: true, deadline: '2025-09-10', status: 'pending' },
    attendees: ['Alex Johnson'],
    createdBy: 'School Administration'
  },
  {
    id: 2,
    title: 'Fall Sports Day',
    type: 'sports',
    date: '2025-09-20',
    startTime: '09:00',
    endTime: '14:00',
    location: 'School Sports Field',
    description: 'Annual fall sports day with various competitions and activities for all grades.',
    rsvp: { required: true, deadline: '2025-09-15', status: 'confirmed' },
    attendees: ['Alex Johnson', 'Sam Johnson'],
    createdBy: 'Sports Department'
  },
  {
    id: 3,
    title: 'Science Fair',
    type: 'academic',
    date: '2025-10-05',
    startTime: '10:00',
    endTime: '15:00',
    location: 'School Gymnasium',
    description: 'Students will present their science projects. Parents are invited to attend.',
    rsvp: { required: false, status: 'not-required' },
    attendees: [],
    createdBy: 'Science Department'
  },
  {
    id: 4,
    title: 'Music Recital',
    type: 'cultural',
    date: '2025-10-12',
    startTime: '17:00',
    endTime: '19:00',
    location: 'School Auditorium',
    description: 'Annual music recital featuring performances by students from all grades.',
    rsvp: { required: true, deadline: '2025-10-05', status: 'pending' },
    attendees: ['Sam Johnson'],
    createdBy: 'Music Department'
  },
  {
    id: 5,
    title: 'End of Term Exams',
    type: 'academic',
    date: '2025-11-10',
    endDate: '2025-11-15',
    allDay: true,
    description: 'End of term examinations for all classes.',
    rsvp: { required: false, status: 'not-required' },
    createdBy: 'Academic Office'
  }
];

const eventTypes = [
  { id: 'all', label: 'All Events' },
  { id: 'academic', label: 'Academic' },
  { id: 'sports', label: 'Sports' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'pta', label: 'PTA' },
  { id: 'holidays', label: 'Holidays' }
];

const ParentEvents = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rsvpStatus, setRsvpStatus] = useState({});

  // In a real app, this would be fetched from an API
  const [events, setEvents] = useState(mockEvents);

  // Filter events based on search term and selected type
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || event.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  // Group events by date for the list view
  const eventsByDate = filteredEvents.reduce((groups, event) => {
    const date = event.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {});

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRSVP = (eventId, status) => {
    // In a real app, this would update the backend
    setEvents(events.map(event => {
      if (event.id === eventId && event.rsvp) {
        return {
          ...event,
          rsvp: { ...event.rsvp, status }
        };
      }
      return event;
    }));
    
    setRsvpStatus(prev => ({
      ...prev,
      [eventId]: status
    }));
  };

  const getEventTypeClass = (type) => {
    switch (type) {
      case 'academic': return 'academic';
      case 'sports': return 'sports';
      case 'cultural': return 'cultural';
      case 'pta': return 'pta';
      case 'holidays': return 'holidays';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderEventCard = (event) => {
    const rsvpStatus = event.rsvp?.status || 'not-required';
    const isRSVPRequired = event.rsvp?.required;
    const rsvpDeadline = event.rsvp?.deadline ? new Date(event.rsvp.deadline) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const isRSVPOpen = !rsvpDeadline || rsvpDeadline >= today;
    
    return (
      <div 
        key={event.id} 
        className={`event-card ${getEventTypeClass(event.type)}`}
        onClick={() => setSelectedEvent(event)}
      >
        <div className="event-date">
          <div className="event-day">
            {new Date(event.date).getDate()}
          </div>
          <div className="event-month">
            {new Date(event.date).toLocaleString('default', { month: 'short' })}
          </div>
        </div>
        
        <div className="event-details">
          <h3 className="event-title">{event.title}</h3>
          
          <div className="event-meta">
            {event.startTime && (
              <span className="event-time">
                <FaClock /> {event.startTime}{event.endTime ? ` - ${event.endTime}` : ''}
              </span>
            )}
            
            {event.location && (
              <span className="event-location">
                <FaMapMarkerAlt /> {event.location}
              </span>
            )}
          </div>
          
          {event.description && (
            <p className="event-description">
              {event.description.length > 100 
                ? `${event.description.substring(0, 100)}...` 
                : event.description}
            </p>
          )}
          
          {isRSVPRequired && (
            <div className="event-rsvp">
              <span className="rsvp-label">Your RSVP:</span>
              
              {rsvpStatus === 'pending' && isRSVPOpen && (
                <div className="rsvp-buttons">
                  <button 
                    className="btn btn-sm btn-success"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRSVP(event.id, 'confirmed');
                    }}
                  >
                    <FaCheckCircle /> Attend
                  </button>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRSVP(event.id, 'declined');
                    }}
                  >
                    <FaTimesCircle /> Decline
                  </button>
                </div>
              )}
              
              {rsvpStatus === 'confirmed' && (
                <span className="rsvp-status confirmed">
                  <FaCheckCircle /> Attending
                </span>
              )}
              
              {rsvpStatus === 'declined' && (
                <span className="rsvp-status declined">
                  <FaTimesCircle /> Not Attending
                </span>
              )}
              
              {rsvpDeadline && (
                <div className="rsvp-deadline">
                  RSVP by: {formatDate(rsvpDeadline)}
                </div>
              )}
              
              {!isRSVPOpen && rsvpStatus === 'pending' && (
                <div className="rsvp-closed">
                  RSVP deadline has passed
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="parent-dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <button onClick={() => navigate(-1)} className="back-button">
            <FaArrowLeft /> Back
          </button>
          <h1>School Events & Calendar</h1>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search events..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="view-toggle">
            <button 
              className={`view-button ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
              title="List View"
            >
              <FaList />
            </button>
            <button 
              className={`view-button ${view === 'calendar' ? 'active' : ''}`}
              onClick={() => setView('calendar')}
              title="Calendar View"
            >
              <FaCalendarAlt />
            </button>
          </div>
        </div>
      </header>

      {/* Event Type Filter */}
      <div className="event-type-filter">
        {eventTypes.map(type => (
          <button
            key={type.id}
            className={`type-button ${selectedType === type.id ? 'active' : ''} ${type.id}`}
            onClick={() => setSelectedType(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Events List View */}
      {view === 'list' && (
        <div className="events-list-view">
          {Object.entries(eventsByDate).length > 0 ? (
            Object.entries(eventsByDate).map(([date, events]) => (
              <div key={date} className="events-date-group">
                <h2 className="date-header">{formatDate(date)}</h2>
                <div className="events-grid">
                  {events.map(event => renderEventCard(event))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-events">
              <FaCalendarAlt size={48} />
              <h3>No events found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="event-modal" onClick={e => e.stopPropagation()}>
            <button 
              className="close-modal"
              onClick={() => setSelectedEvent(null)}
            >
              &times;
            </button>
            
            <div className="event-modal-header">
              <span className={`event-type ${getEventTypeClass(selectedEvent.type)}`}>
                {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
              </span>
              <h2>{selectedEvent.title}</h2>
              
              <div className="event-meta">
                <div className="meta-item">
                  <FaCalendarAlt />
                  <span>
                    {formatDate(selectedEvent.date)}
                    {selectedEvent.endDate && ` to ${formatDate(selectedEvent.endDate)}`}
                  </span>
                </div>
                
                {selectedEvent.startTime && (
                  <div className="meta-item">
                    <FaClock />
                    <span>
                      {selectedEvent.startTime}
                      {selectedEvent.endTime ? ` - ${selectedEvent.endTime}` : ''}
                    </span>
                  </div>
                )}
                
                {selectedEvent.location && (
                  <div className="meta-item">
                    <FaMapMarkerAlt />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
                
                {selectedEvent.createdBy && (
                  <div className="meta-item">
                    <FaInfoCircle />
                    <span>Posted by: {selectedEvent.createdBy}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="event-modal-body">
              <h3>Event Details</h3>
              <p>{selectedEvent.description || 'No additional details provided.'}</p>
              
              {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                <div className="event-attendees">
                  <h4>Your Children Attending:</h4>
                  <ul>
                    {selectedEvent.attendees.map((attendee, index) => (
                      <li key={index}>{attendee}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedEvent.rsvp?.required && (
                <div className="event-rsvp-section">
                  <h4>RSVP</h4>
                  {selectedEvent.rsvp.status === 'pending' && (
                    <div className="rsvp-prompt">
                      <p>Will you be attending this event?</p>
                      <div className="rsvp-buttons">
                        <button 
                          className="btn btn-success"
                          onClick={() => {
                            handleRSVP(selectedEvent.id, 'confirmed');
                            setSelectedEvent(null);
                          }}
                        >
                          <FaCheckCircle /> Yes, I'll be there
                        </button>
                        <button 
                          className="btn btn-danger"
                          onClick={() => {
                            handleRSVP(selectedEvent.id, 'declined');
                            setSelectedEvent(null);
                          }}
                        >
                          <FaTimesCircle /> No, I can't make it
                        </button>
                      </div>
                      {selectedEvent.rsvp.deadline && (
                        <p className="rsvp-deadline">
                          Please respond by: {formatDate(selectedEvent.rsvp.deadline)}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {selectedEvent.rsvp.status === 'confirmed' && (
                    <div className="rsvp-status confirmed">
                      <FaCheckCircle /> You're attending this event.
                    </div>
                  )}
                  
                  {selectedEvent.rsvp.status === 'declined' && (
                    <div className="rsvp-status declined">
                      <FaTimesCircle /> You've declined this invitation.
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="event-modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </button>
              
              {selectedEvent.location && (
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedEvent.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <FaMapMarkerAlt /> View on Map
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentEvents;
