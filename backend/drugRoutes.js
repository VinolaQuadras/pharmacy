// // drugRoutes.js
// const express = require('express');
// const router = express.Router();
// const mysql2 = require('mysql2');

// const db = mysql2.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Vin@123#', // Replace with your MySQL password
//   database: 'dbms',
// });

// // Route to fetch all drugs
// router.get('/', (req, res) => {
//   db.query('SELECT * FROM drugs', (err, result) => {
//     if (err) {
//       console.error('Error fetching drugs:', err);
//       res.status(500).json({ message: 'Error fetching drugs' });
//     } else {
//       res.status(200).json(result);
//     }
//   });
// });

// module.exports = router;

// Update your drugRoutes.js file
// Import required modules
const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');

// Create a MySQL connection
const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vin@123#',
  database: 'dbms',
});

// Route to fetch all drugs
router.get('/', (req, res) => {
  db.query('SELECT * FROM drugs', (err, result) => {
    if (err) {
      console.error('Error fetching drugs:', err);
      res.status(500).json({ message: 'Error fetching drugs' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Export the router
module.exports = router;

