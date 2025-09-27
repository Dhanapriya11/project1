const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware


// List of allowed frontend URLs
const allowedOrigins = [
  'http://localhost:3000',    // React dev
  'http://127.0.0.1:3000',   // sometimes browser resolves like this
  'https://yourfrontend.com' // production frontend (update this)
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // allow cookies / auth headers
}));

// Usual express setup
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI , {
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
// User schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: false }, // 👈 optional for now
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin','Teacher'], required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);


// Course schema and model
// Course schema and model
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },       // subject/course name
  classLevel: { type: String, required: true }, // e.g., "10", "12", "B.Sc 1st Year"
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
  title: { type: String, required: true },
  courseId: { type: String, required: true },
  contentType: { type: String, enum: ["video", "document", "quiz", "assignment"], required: true },
  contentUrl: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // teacher who uploaded
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
}, { timestamps: true });
const Content = mongoose.model('Content', contentSchema);
// ================= Teacher Assignment Schema ==================
const teacherAssignmentSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  classId: { type: String, required: true },  // to store class/grade level
  assignedAt: {
    type: Date,
    default: Date.now
  }
});

const TeacherAssignment = mongoose.model('TeacherAssignment', teacherAssignmentSchema);

// ================= Teacher Assignment Routes ==================

// Get all assignments
// Get all assignments
app.get('/api/teacher-assignments', async (req, res) => {
  try {
    const assignments = await TeacherAssignment.find()
      .populate('teacherId', 'name username email role')
      .populate('courseId', 'name classLevel description');

    res.json(assignments);
  } catch (err) {
    console.error('Error fetching teacher assignments:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create assignment (manual)
app.post('/api/teacher-assignments', async (req, res) => {
  try {
    const { teacherId, courseId, classId } = req.body;

    // Validate teacher
    const teacher = await User.findById(teacherId);
    if (!teacher || !['teacher', 'Teacher'].includes(teacher.role)) {
      return res.status(400).json({ error: 'Invalid teacherId or user is not a teacher' });
    }

    // Validate course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ error: 'Invalid courseId' });
    }

    // Check if assignment already exists
    const existing = await TeacherAssignment.findOne({ teacherId, courseId, classId });
    if (existing) {
      return res.status(400).json({ error: 'This assignment already exists' });
    }

    const assignment = new TeacherAssignment({ teacherId, courseId, classId });
    await assignment.save();

    res.status(201).json(assignment);
  } catch (err) {
    console.error('Error creating teacher assignment:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete assignment
app.delete('/api/teacher-assignments/:id', async (req, res) => {
  try {
    const result = await TeacherAssignment.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Assignment not found' });

    res.json({ success: true, message: 'Assignment deleted successfully' });
  } catch (err) {
    console.error('Error deleting teacher assignment:', err);
    res.status(500).json({ error: err.message });
  }
});

// Authentication Middleware
// Authentication Middleware
app.use((req, res, next) => {
  if (
    req.url.startsWith('/api') &&
    !req.url.includes('/api/login') &&
    !req.url.includes('/api/users') &&
    !req.url.includes('/api/register') &&
    !req.url.includes('/api/courses') &&   // 👈 allow courses without login
    !req.url.includes('/api/content')     // 👈 allow content without login
  ) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        req.userId = decoded.userId;
      } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }
    } else {
      return res.status(401).json({ error: 'Authentication required' });
    }
  }
  next();
});


// Middleware to check if user is admin
const requireAdmin = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const user = await User.findById(req.userId);
    if (!user || !['admin', 'superadmin'].includes(user.role.toLowerCase())) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    req.user = user;
    next();
  } catch (err) {
    console.error('Error in requireAdmin middleware:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Routes
app.get('/', (req, res) => {
  console.log('Root endpoint accessed');
  res.send('LMS API Server is running');
});

// API endpoint to get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    console.log('Users fetched from database:', users);
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: err.message });
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
const jwt = require('jsonwebtoken');

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.json({ 
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
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
// API endpoint to create a new course
app.post('/api/courses', async (req, res) => {
  try {
    const { name, classLevel, description, instructor, duration } = req.body;

    if (!name || !classLevel) {
      return res.status(400).json({ error: 'Name and Class Level are required' });
    }

    console.log('Creating course with data:', req.body);

    const course = new Course({
      name,
      classLevel,
      description,
      instructor,
      duration
    });

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
    // Ensure user is logged in
    if (!req.userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const user = await User.findById(req.userId);
    if (!user || !['teacher', 'Teacher'].includes(user.role)) {
      return res.status(403).json({ error: 'Only teachers can upload content' });
    }

    const content = new Content({
      ...req.body,
      uploadedBy: user._id,
      status: 'pending'
    });

    await content.save();
    res.status(201).json(content);
  } catch (err) {
    console.error('Error creating content:', err);
    res.status(400).json({ error: err.message });
  }
});
// Get all pending content (admin only)
app.get('/api/content/pending', requireAdmin, async (req, res) => {
  try {
    const pending = await Content.find({ status: 'pending' }).populate('uploadedBy', 'username role');
    res.json(pending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve or reject content (admin only)
app.patch('/api/content/:id/review', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body; // "approved" or "rejected"
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!content) return res.status(404).json({ error: 'Content not found' });

    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Add this DELETE endpoint for user deletion
app.delete('/api/users/:id', async (req, res) => {
  try {
    console.log('Deleting user with ID:', req.params.id);
    
    // First, verify the user exists
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log('User not found with ID:', req.params.id);
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    const result = await User.findByIdAndDelete(req.params.id);
    console.log('User deleted successfully:', result);
    
    res.json({ 
      success: true,
      message: 'User deleted successfully' 
    });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete user',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
