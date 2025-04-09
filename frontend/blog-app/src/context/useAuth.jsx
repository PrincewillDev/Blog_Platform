import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { authenticated_user, login, logout, register } from '../api/endpoints.jsx';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();
    
    const get_authenticated_user = async () => {
        try {
          const user = await authenticated_user();
          setUser(user);
        } catch (error) {
          console.log("Authentication check failed:", error);
          setUser(null); // If the request fails, set the user to null
        } finally {
          setLoading(false); // Set loading to false after request completes
        }
    };

    const loginUser = async (username, password) => {
        try {
          const user = await login(username, password)
          if (user) {
            setUser(user)
            nav('/')
          } else {
            alert('Incorrect username or password')
          }
        } catch (error) {
          if (error.code === 'ERR_NETWORK') {
            alert('Network error: Please check if the backend server is running')
          } else {
            alert('Login failed: ' + (error.response?.data?.message || error.message))
          }
        }
    }

    const logoutUser = async () => {
      try {
        await logout();
        setUser(null);
        nav('/login')
      } catch (error) {
        console.log("Logout failed:", error);
        // Force logout anyway
        setUser(null);
        nav('/login')
      }
    }

    const registerUser = async (firstName, lastName, username, email, password) => {
      try {
        if (password) {
          await register(firstName, lastName, username, email, password)
          alert('User successfully registered')
          nav('/login')
        }
      } catch (error) {
        if (error.code === 'ERR_NETWORK') {
          alert('Network error: Please check if the backend server is running')
        } else if (error.response && error.response.status === 400) {
          if (error.response.data && error.response.data.data) {
            // Format validation errors nicely
            const errors = error.response.data.data;
            let errorMessage = "Registration failed:\n";
            
            if (errors.username) {
              errorMessage += `- Username: ${errors.username.join(", ")}\n`;
            }
            if (errors.email) {
              errorMessage += `- Email: ${errors.email.join(", ")}\n`;
            }
            if (errors.password) {
              errorMessage += `- Password: ${errors.password.join(", ")}\n`;
            }
            if (errors.first_name) {
              errorMessage += `- First name: ${errors.first_name.join(", ")}\n`;
            }
            if (errors.last_name) {
              errorMessage += `- Last name: ${errors.last_name.join(", ")}\n`;
            }
            
            alert(errorMessage);
          } else {
            alert('Error registering user: ' + (error.response.data.messages || 'Invalid form data'));
          }
        } else {
          alert('Error registering user: ' + (error.response?.data?.message || error.message))
        }
      }
    }

    useEffect(() => {
        get_authenticated_user();
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, registerUser }}>
          {children}
        </AuthContext.Provider>
      );
}

export const useAuth = () => useContext(AuthContext);