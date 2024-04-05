import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Handle registration logic here
    console.log('Register button clicked!');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    // Simulate successful registration
    onRegister();

    // Navigate to the login page after successful registration
    navigate('/login');
  };

  return (
    <div>
      {/* Registration Box */}
      <div className="login-box">
        <h2>Register</h2>
        <form>
          <label>
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(ev) => setUsername(ev.target.value)}
              className="inputBox"
            />
          </label>
          <label>
            <input
              type="text"
              value={email}
              placeholder="Email Address"
              onChange={(ev) => setEmail(ev.target.value)}
              className="inputBox"
            />
          </label>
          <label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </form>
        <br />

        <div className="existing-user-link">
          Already registered? <Link to="/login" className="no-underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
