import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './UserDashboard.css'; // Import your CSS file for styling

function EmployeeDashboard() {
  const { userid } = useParams();
  console.log('User ID:', userid);

  return (
    <div className="user-dashboard-container">
      <h2>Employee Dashboard</h2>
      {userid && (
        <p>Welcome, Employee ID: {userid}!</p>
      )}
      <Link to={`/store/${userid}`}>
        <button>Restock drugs</button>
      </Link>
      <Link to={`/add-drugs/${userid}`}>
        <button>Add new drugs</button>
      </Link>
    </div>
  );
}

export default EmployeeDashboard;
