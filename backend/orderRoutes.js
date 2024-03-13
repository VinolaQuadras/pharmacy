// const express = require('express');
// const router = express.Router();
// const mysql2 = require('mysql2');
// const uuid=require('uuid')
//  // Import the database connection
//  const db = mysql2.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Vin@123#', // Replace with your MySQL password
//     database: 'dbms',
//   });
// // Route to create a new order
// router.post('/', (req, res) => {
//   const { selectedDrugs } = req.body;

//   // Implement your logic to insert the order into the database
//   // You need to create an 'orders' table in your database to store order information

//   const orderDetails = {
//     orderId: uuid.v4(),
//     date: new Date().toISOString(),
//     drugs: selectedDrugs,
//   };

//   // Respond with the order details
//   res.status(200).json(orderDetails);
// });

// module.exports = router;
// Create a new file orderRoutes.js
// const express = require('express');
// const router = express.Router();
// const mysql2 = require('mysql2');

// const db = mysql2.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Vin@123#',
//   database: 'dbms',
// });

// // Route to fetch orders for a specific user
// router.get('/:user_id', (req, res) => {
//   const userId = req.params.user_id;
//   db.query('SELECT * FROM orders WHERE user_id = ?', [userId], (err, result) => {
//     if (err) {
//       console.error('Error fetching orders:', err);
//       res.status(500).json({ message: 'Error fetching orders' });
//     } else {
//       res.status(200).json(result);
//     }
//   });
// });

// module.exports = router;

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

// Route to fetch all orders for a specific user with details
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await getOrdersWithDetails(userId);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Helper function to get orders with details for a specific user
const getOrdersWithDetails = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT o.order_id, o.purchased_date, od.drug_id, od.quantity, d.drug_name, d.drug_use, d.expiry_date, d.mrp ' +
      'FROM orders o ' +
      'JOIN order_details od ON o.order_id = od.order_id ' +
      'JOIN drugs d ON od.drug_id = d.drug_id ' +
      'WHERE o.user_id = ?',
      [userId],
      (err, orders) => {
        if (err) {
          console.error('Error fetching orders with details:', err);
          reject([]);
        } else {
          resolve(orders);
        }
      }
    );
  });
};



// Export the router
module.exports = router;


