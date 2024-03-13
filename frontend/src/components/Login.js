import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import your CSS file for styling

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    axios.post('http://localhost:5000/login', loginData)
      .then((response) => {
        console.log(response.data);
        const { id } = response.data;
        const { email } = loginData;
  
        if (email && typeof email === 'string') {
          // Check if email ends with "@pharma.in"
          if (email.toLowerCase().endsWith('@pharma.in')) {
            navigate(`/employee-dashboard/${id}`);
          } else {
            navigate(`/dashboard/${id}`);
          }
        } else {
          console.error('Email not found or not in expected format');
          // Handle the case where email is not found or not in expected format
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        // Handle error, e.g., display an error message
      });
  };
  

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Login</h2>
        <label>Email:</label>
        <input type="text" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
        <label>Password:</label>
        <input type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
        <center><button onClick={handleLogin}>Login</button></center>
      </div>
    </div>
  );
}

export default Login;
