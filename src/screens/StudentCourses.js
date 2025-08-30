import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, faGraduationCap, faSearch, faFilter, faBookmark, 
  faCertificate, faComments, faChartLine, faUser, faClock,
  faCheck, faStar, faSort, faSortUp, faSortDown
} from '@fortawesome/free-solid-svg-icons';
import './StudentCourses.css';

const StudentCourses = () => {
  // Mock data for demonstration
  const [allCourses, setAllCourses] = useState([
    {
      id: 1,
      name: 'Introduction to Python Programming',
      code: 'CS101',
      description: 'Learn the fundamentals of Python programming language',
      instructor: 'Dr. Jane Smith',
      instructorEmail: 'jane.smith@university.edu',
      duration: '12 weeks',
      semester: 'Fall 2023',
      creditHours: 3,
      category: 'Computer Science',
      difficulty: 'Beginner',
      enrolled: true,
      enrollmentCount: 120,
      tags: ['Programming', 'Beginner', 'Python']
    },
    {
      id: 2,
      name: 'Data Structures and Algorithms',
      code: 'CS201',
      description: 'Advanced data structures and algorithm design',
      instructor: 'Prof. John Doe',
      instructorEmail: 'john.doe@university.edu',
      duration: '16 weeks',
      semester: 'Spring 2024',
      creditHours: 4,
      category: 'Computer Science',
      difficulty: 'Intermediate',
      enrolled: false,
      enrollmentCount: 85,
      tags: ['Algorithms', 'Intermediate', 'Data Structures']
    },
    {
      id: 3,
      name: 'Machine Learning Fundamentals',
      code: 'CS301',
      description: 'Introduction to machine learning concepts and applications',
      instructor: 'Dr. Emily Johnson',
      instructorEmail: 'emily.johnson@university.edu',
      duration: '14 weeks',
      semester: 'Fall 2023',
      creditHours: 3,
      category: 'Computer Science',
      difficulty: 'Advanced',
      enrolled: true,
      enrollmentCount: 65,
      tags: ['AI', 'Advanced', 'Machine Learning']
    },
    {
      id: 4,
      name: 'Calculus I',
      code: 'MATH101',
      description: 'Fundamental concepts of differential and integral calculus',
      instructor: 'Prof. Robert Brown',
      instructorEmail: 'robert.brown@university.edu',
      duration: '16 weeks',
      semester: 'Spring 2024',
      creditHours: 4,
      category: 'Mathematics',
      difficulty: 'Intermediate',
      enrolled: false,
      enrollmentCount: 210,
      tags: ['Math', 'Intermediate', 'Calculus']
    },
    {
      id: 5,
      name: 'Web Development with React',
      code: 'CS250',
      description: 'Build modern web applications with React framework',
      instructor: 'Dr. Sarah Wilson',
      instructorEmail: 'sarah.wilson@university.edu',
      duration: '10 weeks',
      semester: 'Winter 2024',
      creditHours: 3,
      category: 'Computer Science',
      difficulty: 'Intermediate',
      enrolled: false,
      enrollmentCount: 95,
      tags: ['Web Development', 'Intermediate', 'React']
    }
  ]);

  const [myCourses, setMyCourses] = useState([
    {
      id: 1,
      name: 'Introduction to Python Programming',
      code: 'CS101',
      progress: 65,
      nextAssignment: {
        name: 'Final Project',
        dueDate: '2023-12-15',
        type: 'Project'
      },
      materials: [
        { name: 'Lecture 1 - Introduction.pdf', type: 'pdf' },
        { name: 'Python Basics Video', type: 'video' },
        { name: 'Week 2 Slides.pptx', type: 'slides' }
      ],
      grade: 'B+',
      startDate: '2023-09-01',
      endDate: '2023-12-20'
    },
    {
      id: 3,
      name: 'Machine Learning Fundamentals',
      code: 'CS301',
      progress: 30,
      nextAssignment: {
        name: 'Assignment 2 - Regression',
        dueDate: '2023-11-30',
        type: 'Assignment'
      },
      materials: [
        { name: 'Lecture 1 - Linear Regression.pdf', type: 'pdf' },
        { name: 'ML Concepts Video', type: 'video' }
      ],
      grade: 'A-',
      startDate: '2023-10-01',
      endDate: '2024-01-20'
    }
  ]);

  const [recommendedCourses, setRecommendedCourses] = useState([
    {
      id: 6,
      name: 'Data Science with Python',
      code: 'DS101',
      description: 'Apply Python to data analysis and visualization',
      category: 'Data Science',
      difficulty: 'Intermediate',
      popularity: 95,
      tags: ['Data Science', 'Python', 'Intermediate'],
      bookmarked: false
    },
    {
      id: 7,
      name: 'Advanced Web Development',
      code: 'CS400',
      description: 'Full-stack development with modern frameworks',
      category: 'Computer Science',
      difficulty: 'Advanced',
      popularity: 88,
      tags: ['Web Development', 'Advanced', 'Full-stack'],
      bookmarked: true
    },
    {
      id: 8,
      name: 'Database Systems',
      code: 'CS350',
      description: 'Design and implementation of database systems',
      category: 'Computer Science',
      difficulty: 'Intermediate',
      popularity: 76,
      tags: ['Databases', 'Intermediate', 'SQL'],
      bookmarked: false
    }
  ]);

  // State for UI controls
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [sortOrder, setSortOrder] = useState('desc');

  // Get unique categories for filter
  const categories = [...new Set(allCourses.map(course => course.category))];
  
  // Filter and sort courses
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'All' || course.category === filterCategory;
    const matchesDifficulty = filterDifficulty === 'All' || course.difficulty === filterDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  }).sort((a, b) => {
    if (sortBy === 'popularity') {
      return sortOrder === 'desc' ? b.enrollmentCount - a.enrollmentCount : a.enrollmentCount - b.enrollmentCount;
    } else if (sortBy === 'name') {
      return sortOrder === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
    } else if (sortBy === 'latest') {
      // For simplicity, we'll use ID as a proxy for latest
      return sortOrder === 'desc' ? b.id - a.id : a.id - b.id;
    }
    return 0;
  });

  // Toggle course enrollment
  const toggleEnrollment = (courseId) => {
    setAllCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId 
          ? { ...course, enrolled: !course.enrolled } 
          : course
      )
    );
    
    // Update myCourses based on enrollment status
    const course = allCourses.find(c => c.id === courseId);
    if (course) {
      if (course.enrolled) {
        // Remove from myCourses
        setMyCourses(prev => prev.filter(c => c.id !== courseId));
      } else {
        // Add to myCourses with default values
        const newMyCourse = {
          id: course.id,
          name: course.name,
          code: course.code,
          progress: 0,
          nextAssignment: null,
          materials: [],
          grade: 'N/A',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 90*24*60*60*1000).toISOString().split('T')[0] // 90 days from now
        };
        setMyCourses(prev => [...prev, newMyCourse]);
      }
    }
  };

  // Toggle bookmark for recommended courses
  const toggleBookmark = (courseId) => {
    setRecommendedCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId 
          ? { ...course, bookmarked: !course.bookmarked } 
          : course
      )
    );
  };

  // Drop a course
  const dropCourse = (courseId) => {
    if (window.confirm('Are you sure you want to drop this course?')) {
      setMyCourses(prev => prev.filter(course => course.id !== courseId));
      setAllCourses(prev => 
        prev.map(course => 
          course.id === courseId 
            ? { ...course, enrolled: false } 
            : course
        )
      );
    }
  };

  // Render star rating based on popularity
  const renderRating = (popularity) => {
    const stars = Math.min(5, Math.floor(popularity / 20));
    return (
      <div className="rating">
        {[...Array(5)].map((_, i) => (
          <FontAwesomeIcon 
            key={i} 
            icon={faStar} 
            className={i < stars ? 'star-filled' : 'star-empty'} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="student-courses-container">
      <div className="courses-header">
        <h2>My Courses</h2>
        <div className="header-tabs">
          <button 
            className={activeTab === 'all' ? 'active' : ''} 
            onClick={() => setActiveTab('all')}
          >
            <FontAwesomeIcon icon={faBook} /> All Courses
          </button>
          <button 
            className={activeTab === 'my' ? 'active' : ''} 
            onClick={() => setActiveTab('my')}
          >
            <FontAwesomeIcon icon={faGraduationCap} /> My Courses
          </button>
          <button 
            className={activeTab === 'recommended' ? 'active' : ''} 
            onClick={() => setActiveTab('recommended')}
          >
            <FontAwesomeIcon icon={faStar} /> Recommended
          </button>
        </div>
      </div>

      {/* All Courses Tab */}
      {activeTab === 'all' && (
        <div className="courses-tab-content">
          {/* Search and Filters */}
          <div className="courses-filters">
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <FontAwesomeIcon icon={faFilter} />
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <div className="sort-controls">
                <FontAwesomeIcon icon={faSort} />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="popularity">Sort by Popularity</option>
                  <option value="name">Sort by Name</option>
                  <option value="latest">Sort by Latest</option>
                </select>
                <button 
                  className="sort-order-btn"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} />
                </button>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="courses-grid">
            {filteredCourses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-header">
                  <h3>{course.name} <span className="course-code">({course.code})</span></h3>
                  <div className="course-tags">
                    {course.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <p className="course-description">{course.description}</p>
                <div className="course-details">
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faUser} />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faClock} />
                    <span>{course.duration} | {course.semester}</span>
                  </div>
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <span>{course.creditHours} Credit Hours</span>
                  </div>
                  <div className="detail-item">
                    <span>Enrolled: {course.enrollmentCount} students</span>
                  </div>
                </div>
                <div className="course-actions">
                  <button 
                    className={course.enrolled ? 'enrolled-btn' : 'enroll-btn'}
                    onClick={() => toggleEnrollment(course.id)}
                  >
                    <FontAwesomeIcon icon={course.enrolled ? faCheck : faGraduationCap} />
                    {course.enrolled ? 'Enrolled' : 'Enroll'}
                  </button>
                  {renderRating(course.enrollmentCount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Courses Tab */}
      {activeTab === 'my' && (
        <div className="courses-tab-content">
          <div className="courses-grid">
            {myCourses.map(course => (
              <div key={course.id} className="course-card my-course-card">
                <div className="course-header">
                  <h3>{course.name} <span className="course-code">({course.code})</span></h3>
                  <div className="course-progress">
                    <span>Progress: {course.progress}%</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Grade Summary */}
                <div className="grade-summary">
                  <h4>Current Grade: <span className="grade-value">{course.grade}</span></h4>
                </div>
                
                {/* Upcoming Assignments */}
                {course.nextAssignment && (
                  <div className="upcoming-assignment">
                    <h4>Next Assignment:</h4>
                    <p>{course.nextAssignment.name} - Due: {course.nextAssignment.dueDate}</p>
                    <button className="view-assignment-btn">View Assignment</button>
                  </div>
                )}
                
                {/* Course Materials */}
                <div className="course-materials">
                  <h4>Course Materials:</h4>
                  <ul>
                    {course.materials.map((material, index) => (
                      <li key={index}>
                        <FontAwesomeIcon icon={faBook} /> {material.name}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Course Dates */}
                <div className="course-dates">
                  <p>Course Dates: {course.startDate} to {course.endDate}</p>
                </div>
                
                {/* Actions */}
                <div className="course-actions">
                  <button className="drop-course-btn" onClick={() => dropCourse(course.id)}>
                    Drop Course
                  </button>
                  <button className="certificate-btn">
                    <FontAwesomeIcon icon={faCertificate} /> View Certificate
                  </button>
                  <button className="forum-btn">
                    <FontAwesomeIcon icon={faComments} /> Discussion Forum
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Courses Tab */}
      {activeTab === 'recommended' && (
        <div className="courses-tab-content">
          <div className="courses-grid">
            {recommendedCourses.map(course => (
              <div key={course.id} className="course-card recommended-course-card">
                <div className="course-header">
                  <h3>{course.name} <span className="course-code">({course.code})</span></h3>
                  <button 
                    className="bookmark-btn"
                    onClick={() => toggleBookmark(course.id)}
                  >
                    <FontAwesomeIcon 
                      icon={faBookmark} 
                      className={course.bookmarked ? 'bookmarked' : ''} 
                    />
                  </button>
                </div>
                <p className="course-description">{course.description}</p>
                <div className="course-details">
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <span>{course.category}</span>
                  </div>
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faChartLine} />
                    <span>Popularity: {course.popularity}%</span>
                  </div>
                </div>
                <div className="course-tags">
                  {course.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="course-actions">
                  <button className="enroll-btn">
                    <FontAwesomeIcon icon={faGraduationCap} /> Enroll
                  </button>
                  <button className="view-details-btn">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
