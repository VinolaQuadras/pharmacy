// const express = require('express');
// const router = express.Router();
// const mysql2 = require('mysql2');

// // Create a MySQL connection
// const db = mysql2.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Vin@123#',
//   database: 'dbms',
// });

// // Route to add a new drug
// router.post('/add', (req, res) => {
//   const { Drug_Name, Drug_Use, Quantity, Expiry_Date, MRP } = req.body;

//   // Perform validation, e.g., check if all required fields are present

//   // Insert the drug into the database
//   db.query(
//     'INSERT INTO drugs (Drug_Name, Drug_Use, Quantity, Expiry_Date, MRP) VALUES (?, ?, ?, ?, ?)',
//     [Drug_Name, Drug_Use, Quantity, Expiry_Date, MRP],
//     (err, result) => {
//       if (err) {
//         console.error('Error adding drug:', err);
//         res.status(500).json({ success: false, message: 'Error adding drug' });
//       } else {
//         res.status(200).json({ success: true, message: 'Drug added successfully' });
//       }
//     }
//   );
// });

// module.exports = router;
