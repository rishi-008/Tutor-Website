import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import { loginAccount } from '../controllers/AccountController';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Mock database of users
  const users = [
    { firstName: 'John', lastName: 'x', email: 'student@example.com', password: 'password1', birthday: '', major: 'Computer Science', language: 'English', isTutor: false, isAdmin: false, notifications: true, proofdoc: null, isApproved: true, },
    { firstName: 'Mark', lastName: 'y', email: 'tutor@example.com', password: 'password2', birthday: '', major: 'Computer Science', language: 'English', isTutor: true, isAdmin: false, notifications: true, proofdoc: null, isApproved: true, },
    { firstName: 'Tim', lastName: 'z', email: 'admin@example.com', password: 'password3', birthday: '', major: '', language: 'English', isTutor: false, notifications: true, isAdmin: true, proofdoc: null, courses: [], isApproved: true, },
  ];


  const handleLogin = async (event) => {
    event.preventDefault();
    let user = await loginAccount(email, password);
    if (user) {
      if (user.isAdmin) {
        navigate('/adminPortal');
      } else {
        if (user.student) {
          navigate('/userPortal', { state: { user: user, isTutor: false } });
        }
        if (user.tutor) {
          console.log("Is this going to the tutor portal?");
          navigate('/tutorPortal', { state: { user: user, isTutor: true } });
        }
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Tutor Connect</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="login-btn">Sign In</button>
        </form>
        <div className="login-links">
          <p><Link to="/register" className="link">Register for a new account</Link></p>
          <p><Link to="/" className="link">Forgot Password</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
