const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');
const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vin@123#',
  database: 'dbms',
});

router.get('/orders', async (req, res) => {
  try {
    const query = `
    SELECT o.order_id AS order_id, o.user_id, o.purchased_date, od.drug_id, od.quantity,
    d.Drug_Name, d.Drug_Use, d.Expiry_Date, d.MRP, u.name AS user_name
FROM orders o
JOIN order_details od ON o.order_id = od.order_id
JOIN drugs d ON od.drug_id = d.Drug_ID
JOIN users u ON o.user_id = u.id
ORDER BY o.order_id;

    `;

    const result = await db.promise().query(query);
    res.status(200).json(result[0]);
  } catch (error) {
    console.error('Error in backend route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
