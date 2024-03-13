import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

const AddDrugs = () => {
  const [drug, setDrug] = useState({
    Drug_Id:'',
    Drug_Name: '',
    Drug_Use: '',
    Quantity: '',
    Expiry_Date: '',
    MRP: '',
  });
  const navigate=useNavigate();
  const { userid } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrug({ ...drug, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/drugs/add', drug);
      // Optionally, you can handle success or navigate to another page
      console.log('Drug added successfully!');
      navigate(`/employee-dashboard/${userid}`);
    } catch (error) {
      console.error('Error adding drug:', error);
    }
  };

  return (
    <div>
      <h2>Add Drug</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="Drug_Id">Drug Id:</label>
        <input
          type="text"
          id="Drug_Id"
          name="Drug_Id"
          value={drug.Drug_Id}
          onChange={handleChange}
          required
        />
        <label htmlFor="Drug_Name">Drug Name:</label>
        <input
          type="text"
          id="Drug_Name"
          name="Drug_Name"
          value={drug.Drug_Name}
          onChange={handleChange}
          required
        />
        <label htmlFor="Drug_Use">Drug Use:</label>
        <input
          type="text"
          id="Drug_Use"
          name="Drug_Use"
          value={drug.Drug_Use}
          onChange={handleChange}
          required
        />
        <label htmlFor="Quantity">Quantity:</label>
        <input
          type="number"
          id="Quantity"
          name="Quantity"
          value={drug.Quantity}
          onChange={handleChange}
          required
        />
        <label htmlFor="Expiry_Date">Expiry Date:</label>
        <input
          type="date"
          id="Expiry_Date"
          name="Expiry_Date"
          value={drug.Expiry_Date}
          onChange={handleChange}
          required
        />
        <label htmlFor="MRP">MRP:</label>
        <input
          type="text"  // Change type to text
          id="MRP"
          name="MRP"
          value={drug.MRP}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Drug</button>
      </form>
    </div>
  );
};

export default AddDrugs;
