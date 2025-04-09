// import "./login.css";

// export default function Login() {
//   return (
//     <div className="login">
//       <span className="loginTitle">Login</span>
//       <form className="loginForm">
//         <label>Email</label>
//         <input className="loginInput" type="text" placeholder="Enter your email..." />
//         <label>Password</label>
//         <input className="loginInput" type="password" placeholder="Enter your password..." />
//         <button className="loginButton">Login</button>
//       </form>
//         <button className="loginRegisterButton">Register</button>
//     </div>
//   );
// }

import { useState } from 'react';
import { useAuth } from '../../context/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  const { loginUser } = useAuth();
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!username.trim() || !password) {
      setLoginError('Please enter both username and password');
      return;
    }
    
    try {
      setIsLoading(true);
      await loginUser(username, password);
    } catch (error) {
      setLoginError('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleNavigate = () => {
    nav('/register');
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-brand">
          <i className="fas fa-leaf brand-icon"></i>
          <h2 className="brand-name">OpenSource Blog</h2>
        </div>
        <h1 className="login-title">Welcome Back</h1>
        {loginError && <div className="error-message">{loginError}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">
              <i className="fas fa-user form-icon"></i> Username
            </label>
            <input 
              type="text" 
              id="username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username"
              disabled={isLoading}
            />
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
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </div>
          <button 
            className="login-button" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span><i className="fas fa-spinner fa-spin"></i> Logging in...</span>
            ) : (
              <span><i className="fas fa-sign-in-alt"></i> Login</span>
            )}
          </button>
        </form>
        <p className="register-link" onClick={handleNavigate}>
          Don't have an account? <span>Sign up now</span>
        </p>
      </div>
    </div>
  )
}

export default Login;
