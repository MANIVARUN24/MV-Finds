import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

const STORAGE_KEY = 'mv_finds_admin_auth';

export function AuthProvider({ children }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const login = (email, password) => {
    // Read configured admin credentials from environment or use local dev defaults
    const expectedEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@mvfinds.in').trim().toLowerCase();
    const expectedPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'admin123').trim();

    const inputEmail = (email || '').trim().toLowerCase();
    const inputPassword = (password || '').trim();

    if (inputEmail === expectedEmail && inputPassword === expectedPassword) {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch (e) {
        console.warn('SessionStorage unavailable', e);
      }
      setIsAdminAuthenticated(true);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid admin email or password. Please verify your credentials.'
    };
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('SessionStorage unavailable', e);
    }
    setIsAdminAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAdminAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * Route guard component for admin pages
 */
export function ProtectedAdminRoute({ children }) {
  const { isAdminAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
