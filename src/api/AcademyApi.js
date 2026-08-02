const API_BASE_URL = "http://localhost:5000/api";

// Helper to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Helper to build headers
const getHeaders = (isFormData = false) => {
  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// Helper to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};

// ===================== AUTH =====================

export const registerParent = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const loginParent = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

export const forgotPassword = async (email) => {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
};

export const resetPassword = async (token, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ password }),
  });
  return handleResponse(response);
};

// ===================== SPORTS =====================

export const getSports = async () => {
  const response = await fetch(`${API_BASE_URL}/sports`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response);
};

export const getSportById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/sports/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// ===================== CHILDREN =====================

export const getChildren = async () => {
  const response = await fetch(`${API_BASE_URL}/children`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response);
};

export const getChildById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/children/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response);
};

export const createChild = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/children`, {
    method: "POST",
    headers: getHeaders(true), // Don't set Content-Type for multipart/form-data
    body: formData,
  });
  return handleResponse(response);
};

export const updateChild = async (id, data) => {
  const isFormData = data instanceof FormData;
  const response = await fetch(`${API_BASE_URL}/children/${id}`, {
    method: "PUT",
    headers: getHeaders(isFormData),
    body: data,
  });
  return handleResponse(response);
};

export const deleteChild = async (id) => {
  const response = await fetch(`${API_BASE_URL}/children/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// ===================== ENROLLMENTS =====================

export const createEnrollment = async (enrollmentData) => {
  const response = await fetch(`${API_BASE_URL}/enrollments`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(enrollmentData),
  });
  return handleResponse(response);
};

export const getChildEnrollments = async (childId) => {
  const response = await fetch(`${API_BASE_URL}/enrollments/child/${childId}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// ===================== USER =====================

export const getProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response);
};

export const updateProfile = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const uploadProfilePicture = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/auth/profile-picture`, {
    method: "POST",
    headers: getHeaders(true),
    body: formData,
  });
  return handleResponse(response);
};

export const removeProfilePicture = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/profile-picture`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// ===================== ADMIN - USERS =====================

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response);
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response);
};

export const updateUser = async (id, userData) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const deactivateUser = async (id) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// ===================== ADMIN - SPORTS =====================

export const createSport = async (sportData) => {
  const response = await fetch(`${API_BASE_URL}/sports`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(sportData),
  });
  return handleResponse(response);
};

export const updateSport = async (id, sportData) => {
  const response = await fetch(`${API_BASE_URL}/sports/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(sportData),
  });
  return handleResponse(response);
};

export const deleteSport = async (id) => {
  const response = await fetch(`${API_BASE_URL}/sports/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// ===================== ADMIN - ENROLLMENTS =====================

export const getAllEnrollments = async () => {
  const response = await fetch(`${API_BASE_URL}/enrollments/admin`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response);
};

export const updateEnrollmentStatus = async (id, status) => {
  const response = await fetch(`${API_BASE_URL}/enrollments/admin/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
  return handleResponse(response);
};

// ===================== PAYMENTS =====================

export const getMyPayments = async () => {
  const response = await fetch(`${API_BASE_URL}/payments/my`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response);
};

export const getAllPayments = async () => {
  const response = await fetch(`${API_BASE_URL}/payments`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// ===================== SCHEDULES =====================

export const getAllSchedules = async () => {
  const response = await fetch(`${API_BASE_URL}/schedules`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response);
};

export const createSchedule = async (scheduleData) => {
  const response = await fetch(`${API_BASE_URL}/schedules`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(scheduleData),
  });
  return handleResponse(response);
};

export const updateSchedule = async (id, scheduleData) => {
  const response = await fetch(`${API_BASE_URL}/schedules/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(scheduleData),
  });
  return handleResponse(response);
};

export const deleteSchedule = async (id) => {
  const response = await fetch(`${API_BASE_URL}/schedules/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(response);
};
