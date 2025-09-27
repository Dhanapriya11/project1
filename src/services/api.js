// api.js
const API_URL = "http://localhost:5001/api";

// ✅ Helper to include auth token in headers
const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}), // attach token if found
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  return response.json();
};

// ✅ LOGIN
export const loginUser = async ({ username, password }) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Login failed");
  }

  return res.json(); // { token, user }
};

// ✅ USERS
export const getUsers = () => fetchWithAuth("/users");
export const createUser = (userData) =>
  fetchWithAuth("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
export const deleteUser = (id) =>
  fetchWithAuth(`/users/${id}`, { method: "DELETE" });

// ✅ COURSES
export const getCourses = () => fetchWithAuth("/courses");
export const createCourse = (courseData) =>
  fetchWithAuth("/courses", {
    method: "POST",
    body: JSON.stringify(courseData),
  });


// ✅ TEACHER ASSIGNMENTS
export const getTeacherAssignments = () => fetchWithAuth("/teacher-assignments");
export const createTeacherAssignment = (assignmentData) =>
  fetchWithAuth("/teacher-assignments", {
    method: "POST",
    body: JSON.stringify(assignmentData),
  });
export const deleteTeacherAssignment = (id) =>
  fetchWithAuth(`/teacher-assignments/${id}`, { method: "DELETE" });
// api.js (continuation from previous version)

// ✅ get current logged-in user
export const getCurrentUser = () => fetchWithAuth("/users/me");

// ✅ update user
export const updateUser = (id, updates) =>
  fetchWithAuth(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });

// ✅ alias for backward compatibility
export const assignTeacherToSubject = createTeacherAssignment;
// ==========================
// ✅ CONTENT
// ==========================
export const getContent = () => fetchWithAuth("/content");

export const getContentById = (id) => fetchWithAuth(`/content/${id}`);

export const createContent = (contentData) =>
  fetchWithAuth("/content", {
    method: "POST",
    body: JSON.stringify(contentData),
  });

export const updateContent = async (id, contentData) => {
  // If contentData is FormData, we don't need to stringify it
  const isFormData = contentData instanceof FormData;
  
  const options = {
    method: 'PUT',
  };
  
  if (isFormData) {
    // For FormData, let the browser set the Content-Type header with the correct boundary
    options.body = contentData;
  } else {
    // For regular JSON data, set the Content-Type header and stringify the body
    options.headers = {
      'Content-Type': 'application/json',
    };
    options.body = JSON.stringify(contentData);
  }
  
  return fetchWithAuth(`/content/${id}`, options);
};

// ==========================
// ✅ CONTENT MODERATION
// (Admin / Superadmin only)
// ==========================
export const getPendingContent = () => fetchWithAuth("/content/pending");

export const reviewContent = (id, status) =>
  fetchWithAuth(`/content/${id}/review`, {
    method: "PATCH",
    body: JSON.stringify({ status }), // "approved" or "rejected"
  });

export const approveContent = (id) => reviewContent(id, "approved");

export const rejectContent = (id) => reviewContent(id, "rejected");
