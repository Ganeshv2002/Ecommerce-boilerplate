import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Taskbar from './Taskbar'; // Import Taskbar at the beginning
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login button clicked!');
    console.log('Username:', username);
    console.log('Password:', password);

    // Simulate successful login
    onLogin();

    // Navigate to the homepage after successful login
    navigate('/homepage');
  };

  return (
    <div>
      {/* Login Box */}
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <label>
            <input
              type="text"
              value={username}
              placeholder="Email Address"
              onChange={(ev) => setUsername(ev.target.value)}
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
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>

        <div className="new-user-link">
          New user? <span>Create an Account</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
