const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Course schema and model
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: String,
  duration: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Course = mongoose.model('Course', courseSchema);

// Add test courses
const testCourses = [
  {
    title: 'Introduction to React',
    description: 'Learn the basics of React.js',
    instructor: 'dhana',
    duration: '4 weeks'
  },
  {
    title: 'Advanced JavaScript',
    description: 'Deep dive into modern JavaScript',
    instructor: 'dhana',
    duration: '6 weeks'
  },
  {
    title: 'Web Development Fundamentals',
    description: 'HTML, CSS, and basic JavaScript',
    instructor: 'dhanapriya',
    duration: '8 weeks'
  }
];

async function addTestCourses() {
  try {
    await Course.deleteMany({}); // Clear existing courses
    const courses = await Course.insertMany(testCourses);
    console.log('Added test courses:', courses);
    process.exit(0);
  } catch (error) {
    console.error('Error adding test courses:', error);
    process.exit(1);
  }
}

addTestCourses();
