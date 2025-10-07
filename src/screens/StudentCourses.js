import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Clock, Users, Star, Play,
  Download, Calendar, Award, ChevronRight,
  Search, Filter, Grid, List, X, CheckCircle
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui/PremiumComponents';
import { useTheme } from '../contexts/PremiumContexts';
import StudentPageWrapper from '../components/StudentPageWrapper';

const StudentCourses = () => {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const courses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      instructor: 'Dr. Jane Smith',
      progress: 75,
      duration: '12 weeks',
      level: 'Advanced',
      rating: 4.8,
      students: 45,
      thumbnail: '📊',
      description: 'Comprehensive course covering calculus, algebra, and statistics',
      lessons: 24,
      completed: 18,
      nextLesson: 'Integration Techniques',
      dueDate: '2024-02-15',
      enrolled: true,
      videos: [
        { id: 1, title: 'Introduction to Calculus', duration: '15:30', watched: true },
        { id: 2, title: 'Basic Derivatives', duration: '22:45', watched: true },
        { id: 3, title: 'Integration Techniques', duration: '18:20', watched: false }
      ]
    },
    {
      id: 2,
      title: 'Introduction to Science',
      instructor: 'Prof. Brown',
      progress: 60,
      duration: '8 weeks',
      level: 'Beginner',
      rating: 4.6,
      students: 32,
      thumbnail: '🔬',
      description: 'Basic scientific principles and methodology',
      lessons: 16,
      completed: 10,
      nextLesson: 'Chemical Reactions',
      dueDate: '2024-02-20',
      enrolled: true,
      videos: [
        { id: 1, title: 'Scientific Method', duration: '12:15', watched: true },
        { id: 2, title: 'Chemical Reactions', duration: '19:30', watched: false }
      ]
    },
    {
      id: 3,
      title: 'Creative Writing',
      instructor: 'Ms. Davis',
      progress: 90,
      duration: '10 weeks',
      level: 'Intermediate',
      rating: 4.9,
      students: 28,
      thumbnail: '✍️',
      description: 'Develop creative writing skills and techniques',
      lessons: 20,
      completed: 18,
      nextLesson: 'Poetry Workshop',
      dueDate: '2024-02-10',
      enrolled: true,
      videos: [
        { id: 1, title: 'Writing Fundamentals', duration: '14:45', watched: true },
        { id: 2, title: 'Character Development', duration: '16:20', watched: true },
        { id: 3, title: 'Poetry Workshop', duration: '21:10', watched: false }
      ]
    },
    {
      id: 4,
      title: 'Computer Programming',
      instructor: 'Mr. Wilson',
      progress: 45,
      duration: '14 weeks',
      level: 'Intermediate',
      rating: 4.7,
      students: 38,
      thumbnail: '💻',
      description: 'Learn programming fundamentals with Python',
      lessons: 28,
      completed: 13,
      nextLesson: 'Object-Oriented Programming',
      dueDate: '2024-02-25',
      enrolled: false,
      videos: [
        { id: 1, title: 'Python Basics', duration: '20:15', watched: false },
        { id: 2, title: 'Variables and Data Types', duration: '18:30', watched: false }
      ]
    }
  ];

  // Course functionality handlers
  const handleEnrollCourse = (courseId) => {
    const updatedCourses = courses.map(course => 
      course.id === courseId ? { ...course, enrolled: true } : course
    );
    alert(`Successfully enrolled in course!`);
  };

  const handleUnenrollCourse = (courseId) => {
    if (window.confirm('Are you sure you want to unenroll from this course?')) {
      const updatedCourses = courses.map(course => 
        course.id === courseId ? { ...course, enrolled: false } : course
      );
      alert(`Successfully unenrolled from course.`);
    }
  };

  const handlePlayVideo = (course, video) => {
    setCurrentVideo({ course, video });
    setIsVideoModalOpen(true);
  };

  const handleVideoComplete = (courseId, videoId) => {
    // Mark video as watched and update progress
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        const updatedVideos = course.videos.map(video => 
          video.id === videoId ? { ...video, watched: true } : video
        );
        const watchedCount = updatedVideos.filter(v => v.watched).length;
        const progress = Math.round((watchedCount / updatedVideos.length) * 100);
        return { ...course, videos: updatedVideos, progress, completed: watchedCount };
      }
      return course;
    });
    alert('Video marked as complete!');
  };

  const handleDownloadMaterial = (courseId, materialName) => {
    // Simulate download
    alert(`Downloading ${materialName}...`);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <StudentPageWrapper>
      <motion.div
        className="p-6 lg:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header className="mb-8" variants={itemVariants}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                My Courses 📚
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Continue your learning journey with personalized courses
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Search and Filter */}
        <motion.section className="mb-8" variants={itemVariants}>
          <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <Button variant="ghost" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </Card>
        </motion.section>

        {/* Courses Grid/List */}
        <motion.section variants={itemVariants}>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Card className="p-6 h-full flex flex-col bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{course.thumbnail}</div>
                      <Badge variant={course.level === 'Advanced' ? 'danger' : course.level === 'Intermediate' ? 'warning' : 'success'}>
                        {course.level}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">
                      {course.description}
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {course.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {course.enrolled ? (
                        <>
                          <Button 
                            variant="primary" 
                            className="flex-1"
                            onClick={() => setSelectedCourse(course)}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Continue Learning
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDownloadMaterial(course.id, 'Course Materials')}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <Button 
                          variant="primary" 
                          className="flex-1"
                          onClick={() => handleEnrollCourse(course.id)}
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Enroll Now
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Instructor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Next Lesson
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredCourses.map((course, index) => (
                      <motion.tr
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-2xl mr-3">{course.thumbnail}</div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {course.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {course.lessons} lessons • {course.completed} completed
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {course.instructor}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-900 dark:text-white">{course.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {course.nextLesson}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            {course.enrolled ? (
                              <>
                                <Button 
                                  variant="primary" 
                                  size="sm"
                                  onClick={() => setSelectedCourse(course)}
                                >
                                  <Play className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDownloadMaterial(course.id, 'Course Materials')}
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </>
                            ) : (
                              <Button 
                                variant="primary" 
                                size="sm"
                                onClick={() => handleEnrollCourse(course.id)}
                              >
                                Enroll
                              </Button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </motion.section>

        {/* Course Detail Modal */}
        {selectedCourse && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedCourse.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Instructor: {selectedCourse.instructor}
                    </p>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedCourse(null)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Course Progress</h3>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-3 mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${selectedCourse.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      {selectedCourse.completed} of {selectedCourse.lessons} lessons completed ({selectedCourse.progress}%)
                    </p>

                    <h3 className="text-lg font-semibold mb-4">Course Videos</h3>
                    <div className="space-y-3">
                      {selectedCourse.videos?.map((video) => (
                        <div key={video.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${video.watched ? 'bg-green-500' : 'bg-gray-300'}`}>
                              {video.watched ? <CheckCircle className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-gray-600" />}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{video.title}</p>
                              <p className="text-sm text-gray-500">{video.duration}</p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handlePlayVideo(selectedCourse, video)}
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Course Information</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                        <span className="font-medium">{selectedCourse.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Level:</span>
                        <Badge variant={selectedCourse.level === 'Advanced' ? 'danger' : selectedCourse.level === 'Intermediate' ? 'warning' : 'success'}>
                          {selectedCourse.level}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Students:</span>
                        <span className="font-medium">{selectedCourse.students}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">{selectedCourse.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-gray-600 dark:text-gray-400">{selectedCourse.description}</p>
                    </div>

                    <div className="mt-6 space-y-3">
                      <Button 
                        variant="primary" 
                        className="w-full"
                        onClick={() => alert('Navigate to next lesson')}
                      >
                        Continue to Next Lesson
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full"
                        onClick={() => handleDownloadMaterial(selectedCourse.id, 'Course Materials')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Materials
                      </Button>
                      {selectedCourse.enrolled && (
                        <Button 
                          variant="danger" 
                          className="w-full"
                          onClick={() => {
                            handleUnenrollCourse(selectedCourse.id);
                            setSelectedCourse(null);
                          }}
                        >
                          Unenroll from Course
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Video Player Modal */}
        {isVideoModalOpen && currentVideo && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {currentVideo.video.title}
                  </h3>
                  <Button variant="ghost" onClick={() => setIsVideoModalOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-white mx-auto mb-4" />
                    <p className="text-white">Video Player Placeholder</p>
                    <p className="text-gray-300 text-sm">Duration: {currentVideo.video.duration}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="primary"
                    onClick={() => {
                      handleVideoComplete(currentVideo.course.id, currentVideo.video.id);
                      setIsVideoModalOpen(false);
                    }}
                  >
                    Mark as Complete
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => handleDownloadMaterial(currentVideo.course.id, currentVideo.video.title)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </StudentPageWrapper>
  );
};

export default StudentCourses;