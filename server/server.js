const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process if we can't connect to MongoDB
});

// Log when the connection is established
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

// Log when the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Log when there's an error
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

// User schema and model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['Student', 'Teacher', 'Parent', 'Admin'],
    default: 'Student',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

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

// Content schema and model
const contentSchema = new mongoose.Schema({
  title: String,
  courseId: String,
  contentType: String, // video, document, quiz, etc.
  contentUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Content = mongoose.model('Content', contentSchema);

// Routes
app.get('/', (req, res) => {
  console.log('Root endpoint accessed');
  res.send('LMS API Server is running');
});

// API endpoint to get all users
app.get('/api/users', async (req, res) => {
  try {
    console.log('Fetching users from database');
    const users = await User.find({}, { password: 0 }); // Exclude passwords from the response
    console.log('Users fetched:', users);
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
});

// API endpoint to create a new user
app.post('/api/users', async (req, res) => {
  try {
    console.log('Creating user with data:', req.body);
    const user = new User(req.body);
    await user.save();
    console.log('User created:', user);
    res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json({ error: err.message });
  }
});

// API endpoint for user login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt with:', { username, password });
    const user = await User.findOne({ username, password });
    console.log('User found:', user);
    if (user) {
      res.json(user);
    } else {
      // Let's also try to find the user without password to see if username exists
      const userExists = await User.findOne({ username });
      console.log('User exists without password check:', userExists);
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

// API endpoint to get all courses
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    console.log('Courses fetched from database:', courses);
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ error: err.message });
  }
});

// API endpoint to create a new course
app.post('/api/courses', async (req, res) => {
  try {
    console.log('Creating course with data:', req.body);
    const course = new Course(req.body);
    await course.save();
    console.log('Course created:', course);
    res.status(201).json(course);
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(400).json({ error: err.message });
  }
});

// API endpoint to get all content
app.get('/api/content', async (req, res) => {
  try {
    const content = await Content.find();
    console.log('Content fetched from database:', content);
    res.json(content);
  } catch (err) {
    console.error('Error fetching content:', err);
    res.status(500).json({ error: err.message });
  }
});

// API endpoint to create new content
app.post('/api/content', async (req, res) => {
  try {
    console.log('Creating content with data:', req.body);
    const content = new Content(req.body);
    await content.save();
    console.log('Content created:', content);
    res.status(201).json(content);
  } catch (err) {
    console.error('Error creating content:', err);
    res.status(400).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});