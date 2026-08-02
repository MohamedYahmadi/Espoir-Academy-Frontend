import { createContext, useContext, useState, useEffect } from 'react';
import { loginParent, registerParent, getProfile } from '@/api/AcademyApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      // Normalize the response to match login format (id instead of _id)
      const userData = response.data || response;
      setUser({
        id: userData._id || userData.id,
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        isActive: userData.isActive,
        profilePicture: userData.profilePicture,
      });
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await loginParent(credentials);
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (formData) => {
    try {
      const response = await registerParent(formData);
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Clear all auth-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Reset state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};