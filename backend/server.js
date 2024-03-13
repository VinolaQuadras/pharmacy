const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql2 = require('mysql2');
const drugRoutes = require('./drugRoutes');
const orderRoutes= require('./orderRoutes');
const employeeRoutes=require('./employeeRoutes');
// const addDrugRoutes = require('./addDrugRoutes');
const app = express();
const port = 5000;


const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vin@123#',
  database: 'dbms',
});

module.exports=db;

db.connect((err) => {
  if (err) {
    console.error('Database connection error: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

app.use(cors());
app.use(bodyParser.json());
app.use('/api/drugs', drugRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/employee', employeeRoutes);
// app.use('/api/add-drug', addDrugRoutes);



// Add a route to handle adding drugs
app.post('/api/drugs/add', async (req, res) => {
  const { Drug_Id,Drug_Name, Drug_Use, Quantity, Expiry_Date, MRP } = req.body;

  try {
    // Insert the new drug into the database
    await db.promise().execute(
      'INSERT INTO drugs (Drug_Id,Drug_Name, Drug_Use, Quantity, Expiry_Date, MRP) VALUES (?,?, ?, ?, ?, ?)',
      [Drug_Id,Drug_Name, Drug_Use, Quantity, Expiry_Date, MRP]
    );

    res.status(200).json({ success: true, message: 'Drug added successfully' });
  } catch (error) {
    console.error('Error adding drug:', error);
    res.status(500).json({ success: false, message: 'Error adding drug' });
  }
});


// Update the quantity of a drug
app.put('/api/drugs/:id', async (req, res) => {
  const drugId = req.params.id;
  const { quantity } = req.body;

  try {
    // Update the quantity of the drug in the database
    await db.promise().execute(
      'UPDATE drugs SET quantity = ? WHERE Drug_ID = ?',
      [quantity, drugId]
    );

    res.status(200).json({ success: true, message: 'Drug quantity updated successfully' });
  } catch (error) {
    console.error('Error updating drug quantity:', error);
    res.status(500).json({ success: false, message: 'Error updating drug quantity' });
  }
});

// Signup route
// app.post('/signup', async (req, res) => {
//   const { email, name, password, address, contact_no } = req.body;

//   // Hash the password before storing it
//   const hashedPassword = await bcrypt.hash(password, 10);

//   db.query(
//     'INSERT INTO users (email, name, password, address, contact_no) VALUES (?, ?, ?, ?, ?)',
//     [email, name, hashedPassword, address, contact_no],
//     (err, result) => {
//       if (err) {
//         console.error('Error signing up:', err);
//         res.status(500).json({ message: 'Error signing up' });
//       } else {
//         res.status(200).json({ message: 'Signup successful' });
//       }
//     }
//   );
// });

app.post('/signup', async (req, res) => {
  const { email, name, password, address, contact_no } = req.body;

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (email, name, password, address, contact_no) VALUES (?, ?, ?, ?, ?)',
    [email, name, hashedPassword, address, contact_no],
    (err, result) => {
      if (err) {
        console.error('Error signing up:', err);
        res.status(500).json({ message: 'Error signing up' });
      } else {
        // Include the user ID in the response
        const userId = result.insertId;
        res.status(200).json({ message: 'Signup successful', id: userId });
      }
    }
  );
});

// Login route
// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
//     if (err) {
//       console.error('Error logging in:', err);
//       res.status(500).json({ message: 'Error logging in' });
//     } else if (result.length > 0) {
//       const match = await bcrypt.compare(password, result[0].password);
//       if (match) {
//         res.status(200).json({ message: 'Login successful' });
//       } else {
//         res.status(401).json({ message: 'Invalid credentials' });
//       }
//     } else {
//       res.status(401).json({ message: 'User not found' });
//     }
//   });
// });

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ message: 'Error logging in' });
    } else if (result.length > 0) {
      const match = await bcrypt.compare(password, result[0].password);
      if (match) {
        // Include the user ID in the response
        const userId = result[0].id;
        res.status(200).json({ message: 'Login successful', id: userId });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'User not found' });
    }
  });
});


// Add this route to retrieve orders for a specific user
app.get('/api/orders/:userId', (req, res) => {
  const userId = req.params.userId;

  db.query('SELECT * FROM orders WHERE User_ID = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ message: 'Error fetching orders' });
    } else {
      res.status(200).json(result);
    }
  });
});

// ... (previous code)


// app.post('/api/orders/place-order', async (req, res) => {
//   const { user_id, drugs } = req.body;
//   console.log('Received Order Data:', req.body);
//   try {
//     // Create a new order
//     const orderResult = await db.promise().execute(
//       'INSERT INTO orders (user_id, purchased_date) VALUES (?, CURDATE())',
//       [user_id]
//     );

//     console.log('Order Result:', orderResult);  // Log the order result

//     const orderId = orderResult[0].insertId;
//     console.log('Order Insert Query:', db.format('INSERT INTO orders (user_id, purchased_date) VALUES (?, CURDATE())', [user_id]));

//     // Insert order details for each drug
//     for (const drug of drugs) {
//       await db.promise().execute(
//         'INSERT INTO order_details (order_id, drug_id, quantity) VALUES (?, ?, ?)',
//         [orderId, drug.drug_id, drug.quantity]
//       );
//       console.log('Order Details Insert Query:', db.format('INSERT INTO order_details (order_id, drug_id, quantity) VALUES (?, ?, ?)', [orderId, drug.drug_id, drug.quantity]));
//     }

//     res.status(200).json({ success: true, message: 'Order placed successfully' });
//   } catch (error) {
//     console.error('Error placing order:', error);
//     res.status(500).json({ success: false, message: 'Error placing order' });
//   }
// });

app.post('/api/orders/place-order', async (req, res) => {
  const { user_id, drugs } = req.body;
  console.log('Received Order Data:', req.body);
  try {
    // Create a new order
    const orderResult = await db.promise().execute(
      'INSERT INTO orders (user_id, purchased_date) VALUES (?, CURDATE())',
      [user_id]
    );

    console.log('Order Result:', orderResult);  // Log the order result

    const orderId = orderResult[0].insertId;
    console.log('Order Insert Query:', db.format('INSERT INTO orders (user_id, purchased_date) VALUES (?, CURDATE())', [user_id]));

    // Insert order details for each drug
    for (const drug of drugs) {
      await db.promise().execute(
        'INSERT INTO order_details (order_id, drug_id, quantity) VALUES (?, ?, ?)',
        [orderId, drug.drug_id, drug.quantity]
      );
      console.log('Order Details Insert Query:', db.format('INSERT INTO order_details (order_id, drug_id, quantity) VALUES (?, ?, ?)', [orderId, drug.drug_id, drug.quantity]));

      // Update quantity in the drugs table
      await db.promise().execute(
        'UPDATE drugs SET quantity = quantity - ? WHERE Drug_ID = ?',
        [drug.quantity, drug.drug_id]
      );
      console.log('Update Quantity Query:', db.format('UPDATE drugs SET quantity = quantity - ? WHERE Drug_ID = ?', [drug.quantity, drug.drug_id]));
    }

    res.status(200).json({ success: true, message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Error placing order' });
  }
});






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
