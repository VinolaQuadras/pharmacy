

// // UserDashboard component
// import React from 'react';
// import { Link, useParams } from 'react-router-dom';

// function UserDashboard() {
//   const { userid } = useParams();
//   console.log('User ID:', userid);

//   return (
//     <div>
//       <h2>User Dashboard</h2>
//       {userid && (
//         <p>Welcome, User ID: {userid}!</p>
//       )}
//       <Link to={`/view-orders/${userid}`}>
//         <button>View Orders</button>
//       </Link>
//       <Link to={`/purchase-drugs/${userid}`}>
//         <button>Purchase Drugs</button>
//       </Link>
//     </div>
//   );
// }

// export default UserDashboard;

// UserDashboard component
// UserDashboard component
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './UserDashboard.css'; // Import your CSS file for styling

function UserDashboard() {
  const { userid } = useParams();
  console.log('User ID:', userid);

  return (
    <div className="user-dashboard-container">
      <h2>User Dashboard</h2>
      {userid && (
        <p>Welcome, User ID: {userid}!</p>
      )}
      <Link to={`/view-orders/${userid}`}>
        <button>View Orders</button>
      </Link>
      <Link to={`/purchase-drugs/${userid}`}>
        <button>Purchase Drugs</button>
      </Link>
    </div>
  );
}

export default UserDashboard;
