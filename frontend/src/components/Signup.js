import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css'; // Import your CSS file for styling

function Signup() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    email: '',
    name: '',
    password: '',
    address: '',
    contact_no: '',
  });

  const handleSignup = () => {
    axios.post('http://localhost:5000/signup', signupData)
      .then((response) => {
        console.log(response.data);
        const userId = response.data.id; // Check the correct path
        navigate(`/dashboard/${userId}`);
      })
      .catch((error) => {
        console.error('Error signing up:', error);
      });
  };

  return (
    <div className="signup-container">
      <h1>Pharmacy Management System</h1>
      <div className="signup-form">
        <h2>Signup</h2>
        <label>Email:</label>
        <input type="text" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
        <label>Name:</label>
        <input type="text" value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} />
        <label>Password:</label>
        <input type="password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
        <label>Address:</label>
        <input type="text" value={signupData.address} onChange={(e) => setSignupData({ ...signupData, address: e.target.value })} />
        <label>Contact Number:</label>
        <input type="text" value={signupData.contact_no} onChange={(e) => setSignupData({ ...signupData, contact_no: e.target.value })} />
        <center><button onClick={handleSignup}>Signup</button></center>
        <p>Already Have an Account</p><center>
        <Link to="/login">Login</Link></center>
      </div>
    </div>
  );
}

export default Signup;
