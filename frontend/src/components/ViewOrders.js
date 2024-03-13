
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './ViewOrders.css'; // Import your CSS file for styling

const ViewOrders = () => {
  const { userid } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${userid}`);
        console.log('Orders Response:', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    fetchOrders();
  }, [userid]);
  

  return (
    <div className="orders-container">
      <h2>View Orders</h2>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Purchased Date</th>
              <th>Drug ID</th>
              <th>Drug Name</th>
              <th>Drug Use</th>
              <th>Expiry Date</th>
              <th>MRP</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{new Date(order.purchased_date).toLocaleDateString('en-US')}</td>
                <td>{order.drug_id}</td>
                <td>{order.drug_name}</td>
                <td>{order.drug_use}</td>
                <td>{new Date(order.expiry_date).toLocaleDateString('en-US')}</td>
                <td>{order.mrp}</td>
                <td>{order.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}

      <Link to={`/dashboard/${userid}`}>
        <button>Home</button>
      </Link>
    </div>
  );
};

export default ViewOrders;


