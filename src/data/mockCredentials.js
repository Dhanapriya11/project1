// Mock Credentials for Testing Different User Roles
export const mockUsers = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@eduai.com',
        password: 'admin123',
        role: 'Admin',
        name: 'Admin User',
        avatar: null
    },
    {
        id: 2,
        username: 'teacher1',
        email: 'teacher@eduai.com',
        password: 'teacher123',
        role: 'Teacher',
        name: 'Jane Smith',
        avatar: null,
        subjects: ['Mathematics', 'Physics'],
        classes: ['Grade 10A', 'Grade 11B']
    },
    {
        id: 3,
        username: 'parent1',
        email: 'parent@eduai.com',
        password: 'parent123',
        role: 'Parent',
        name: 'John Johnson',
        avatar: null,
        children: [
            { id: 1, name: 'Alex Johnson', grade: '5th Grade', studentId: 'STU001' },
            { id: 2, name: 'Sam Johnson', grade: '3rd Grade', studentId: 'STU002' }
        ]
    },
    {
        id: 4,
        username: 'student1',
        email: 'student@eduai.com',
        password: 'student123',
        role: 'Student',
        name: 'Alex Johnson',
        avatar: null,
        grade: '5th Grade',
        studentId: 'STU001',
        courses: ['Mathematics', 'Science', 'English'],
        progress: {
            mathematics: 85,
            science: 92,
            english: 78
        }
    },
    {
        id: 5,
        username: 'student2',
        email: 'student2@eduai.com',
        password: 'student123',
        role: 'Student',
        name: 'Sam Johnson',
        avatar: null,
        grade: '3rd Grade',
        studentId: 'STU002',
        courses: ['Mathematics', 'Science', 'Art'],
        progress: {
            mathematics: 90,
            science: 88,
            art: 95
        }
    }
];

// Mock authentication function
export const authenticateUser = (username, password) => {
    const user = mockUsers.find(u =>
        (u.username === username || u.email === username) && u.password === password
    );

    if (user) {
        // Remove password from returned user object
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    return null;
};

// Mock data for different roles
export const mockData = {
    courses: [
        {
            id: 1,
            title: 'Advanced Mathematics',
            instructor: 'Jane Smith',
            duration: '12 weeks',
            price: '$199',
            category: 'Mathematics',
            level: 'Advanced',
            startDate: '2024-01-15',
            endDate: '2024-04-15',
            status: 'Active',
            students: 45,
            description: 'Comprehensive course covering advanced mathematical concepts'
        },
        {
            id: 2,
            title: 'Introduction to Science',
            instructor: 'Dr. Brown',
            duration: '8 weeks',
            price: '$149',
            category: 'Science',
            level: 'Beginner',
            startDate: '2024-02-01',
            endDate: '2024-03-30',
            status: 'Active',
            students: 32,
            description: 'Basic scientific principles and methodology'
        },
        {
            id: 3,
            title: 'Creative Writing',
            instructor: 'Ms. Davis',
            duration: '10 weeks',
            price: '$179',
            category: 'English',
            level: 'Intermediate',
            startDate: '2024-01-20',
            endDate: '2024-04-01',
            status: 'Active',
            students: 28,
            description: 'Develop creative writing skills and techniques'
        }
    ],

    announcements: [
        {
            id: 1,
            title: 'Welcome to EduAI Pro!',
            content: 'We are excited to announce the launch of our new AI-powered learning platform.',
            author: 'Admin',
            date: '2024-01-01',
            type: 'general'
        },
        {
            id: 2,
            title: 'New Course Available',
            content: 'Check out our new Advanced Mathematics course starting next week.',
            author: 'Jane Smith',
            date: '2024-01-15',
            type: 'course'
        }
    ],

    assignments: [
        {
            id: 1,
            title: 'Math Homework - Chapter 5',
            course: 'Advanced Mathematics',
            dueDate: '2024-01-25',
            status: 'pending',
            description: 'Complete exercises 1-20 from chapter 5'
        },
        {
            id: 2,
            title: 'Science Project',
            course: 'Introduction to Science',
            dueDate: '2024-02-10',
            status: 'completed',
            description: 'Research and present findings on photosynthesis'
        }
    ],

    messages: [
        {
            id: 1,
            from: 'Jane Smith',
            to: 'Alex Johnson',
            subject: 'Assignment Feedback',
            content: 'Great work on your recent math assignment!',
            date: '2024-01-20',
            read: false
        },
        {
            id: 2,
            from: 'Admin',
            to: 'All Students',
            subject: 'System Maintenance',
            content: 'The system will be under maintenance this weekend.',
            date: '2024-01-18',
            read: true
        }
    ]
};
