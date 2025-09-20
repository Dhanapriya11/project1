const API_BASE_URL = 'http://localhost:5001/api';

// User API functions
export const getUsers = async () => {
  console.log('Fetching users from API');
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    console.log('Get users API response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Get users API error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    const data = await response.json();
    console.log('Get users API response data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  console.log('Create user API call with data:', userData);
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    console.log('Create user API response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Create user API error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Create user API response data:', data);
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  console.log('Update user API call with data:', { userId, userData });
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    console.log('Update user API response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Update user API error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Update user API response data:', data);
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  console.log('Delete user API call for user ID:', userId);
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
    });
    
    console.log('Delete user API response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Delete user API error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Delete user API response data:', data);
    return data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Login API function
export const loginUser = async (credentials) => {
  console.log('Login API call with credentials:', credentials);
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    console.log('Login API response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Login API error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Login API response data:', data);
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Course API functions
export const getCourses = async () => {
  const url = `${API_BASE_URL}/courses`;
  console.log('Fetching courses from:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    
    console.log('Courses API response status:', response.status);
    
    if (!response.ok) {
      let errorText;
      try {
        errorText = await response.text();
        // Try to parse as JSON in case it's a JSON error response
        const errorJson = JSON.parse(errorText);
        console.error('Courses API error (JSON):', errorJson);
        throw new Error(errorJson.message || `HTTP error! status: ${response.status}`);
      } catch (e) {
        console.error('Courses API error (text):', errorText || 'No error details');
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText || 'Unknown error'}`);
      }
    }
    
    let data;
    try {
      data = await response.json();
      console.log('Courses API response data:', data);
      
      // The backend returns the courses array directly
      if (Array.isArray(data)) {
        console.log(`Received ${data.length} courses from API`);
        return data;
      } else if (data && Array.isArray(data.value)) {
        console.log(`Received ${data.value.length} courses from API (nested in value)`);
        return data.value;
      } else {
        console.warn('Unexpected courses data format, returning empty array. Data:', data);
        return [];
      }
    } catch (jsonError) {
      console.error('Error parsing JSON response:', jsonError);
      throw new Error('Failed to parse courses data');
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

// User Profile API functions
export const getCurrentUser = async () => {
  try {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      throw new Error('No user data found');
    }
    
    // Parse the user data from localStorage
    const user = JSON.parse(userData);
    
    // If you need to fetch fresh data, use the ID to get user details
    // For now, we'll return the stored user data
    return user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

export const updateCurrentUser = async (userData) => {
  try {
    // In a real app, you would send this to your backend
    // For now, we'll update the user data in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const updatedUser = { ...currentUser, ...userData };
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return updatedUser;
  } catch (error) {
    console.error('Error updating current user:', error);
    throw error;
  }
};

// Content API functions
export const getContent = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/content`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
};

export const createContent = async (contentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contentData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating content:', error);
    throw error;
  }
};