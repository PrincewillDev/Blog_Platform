// import "./register.css"

// export default function Register() {
//     return (
//         <div className="register">
//       <span className="registerTitle">Register</span>
//       <form className="registerForm">
//         <label>Username</label>
//         <input className="registerInput" type="text" placeholder="Enter your username..." />
//         <label>Email</label>
//         <input className="registerInput" type="text" placeholder="Enter your email..." />
//         <label>Password</label>
//         <input className="registerInput" type="password" placeholder="Enter your password..." />
//         <button className="registerButton">Register</button>
//       </form>
//         <button className="registerLoginButton">Login</button>
//     </div>
//     )
// }

import { useState } from 'react';
import { useAuth } from '../../context/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [registerError, setRegisterError] = useState('')

  const { registerUser } = useAuth();
  const nav = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    // Validate first name
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Last name is optional, no validation needed
    
    // Validate username
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    // Validate email
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Validate password confirmation
    if (password !== passwordConfirm) {
      newErrors.passwordConfirm = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      await registerUser(firstName, lastName, username, email, password);
    } catch (error) {
      setRegisterError('Registration failed. Please try again.');
      console.error('Registration error in component:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleNavigate = () => {
    nav('/login')
  }

  return (
    <div className="register-container">
      <div className="register-form">
        <div className="login-brand">
          <i className="fas fa-leaf brand-icon"></i>
          <h2 className="brand-name">OpenSource Blog</h2>
        </div>
        <h1 className="register-title">Create Account</h1>
        {registerError && <div className="error-message">{registerError}</div>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="first-name">
              <i className="fas fa-user form-icon"></i> First Name
            </label>
            <input 
              type="text" 
              id="first-name"
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              placeholder="Enter your first name"
              className={errors.firstName ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="last-name">
              <i className="fas fa-user-plus form-icon"></i> Last Name
            </label>
            <input 
              type="text" 
              id="last-name"
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              placeholder="Enter your last name (optional)"
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">
              <i className="fas fa-user-tag form-icon"></i> Username
            </label>
            <input 
              type="text" 
              id="username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Choose a username"
              className={errors.username ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.username && <p className="error-text">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope form-icon"></i> Email
            </label>
            <input 
              type="email" 
              id="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email address"
              className={errors.email ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock form-icon"></i> Password
            </label>
            <input 
              type="password" 
              id="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Create a password"
              className={errors.password ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">
              <i className="fas fa-lock form-icon"></i> Confirm Password
            </label>
            <input 
              type="password" 
              id="confirm-password"
              value={passwordConfirm} 
              onChange={(e) => setPasswordConfirm(e.target.value)} 
              placeholder="Confirm your password"
              className={errors.passwordConfirm ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.passwordConfirm && <p className="error-text">{errors.passwordConfirm}</p>}
          </div>
          <button 
            className="register-button" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span><i className="fas fa-spinner fa-spin"></i> Creating Account...</span>
            ) : (
              <span><i className="fas fa-user-plus"></i> Register</span>
            )}
          </button>
        </form>
        <p className="login-link" onClick={handleNavigate}>
          Already have an account? <span>Sign in</span>
        </p>
      </div>
    </div>
  )
}

export default Register;

