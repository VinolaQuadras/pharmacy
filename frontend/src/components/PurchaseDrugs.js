
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';


// const PurchaseDrug = () => {
  
//   const { userid } = useParams();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [drugs, setDrugs] = useState([]);
//   const [selectedDrugs, setSelectedDrugs] = useState([]);
//   const [quantity, setQuantity] = useState({});
//   const [orderPlaced, setOrderPlaced] = useState(false);

//   useEffect(() => {
//     const fetchDrugs = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/drugs');
//         setDrugs(response.data);
//       } catch (error) {
//         console.error('Error fetching drugs:', error);
//       }
//     };

//     fetchDrugs();
//   }, []);


//   const handleDrugSelection = (drugId) => {
//     const isSelected = selectedDrugs.includes(drugId);
  
//     if (isSelected) {
//       // Remove from selected drugs
//       setSelectedDrugs(selectedDrugs.filter((id) => id !== drugId));
//     } else {
//       // Add to selected drugs only if the drugId is not undefined or null
//       if (drugId) {
//         setSelectedDrugs([...selectedDrugs, drugId]);
//       }
//     }
//   };


  
//   const placeOrder = async () => {
//     const filteredSelectedDrugs = selectedDrugs.filter((id) => id);
  
//     const orderData = {
//       user_id: userid,
//       drugs: filteredSelectedDrugs.map((drugId) => {
//         return {
//           drug_id: drugId,
//           quantity: quantity[drugId] || 1,
//         };
//       }),
//     };
  
//     try {
//       const response = await axios.post('http://localhost:5000/api/orders/place-order', orderData);
  
//       if (response.data.success) {
//         setOrderPlaced(true);
//       } else {
//         console.error('Order placement failed.');
//       }
//     } catch (error) {
//       console.error('Error placing order:', error);
//     }
//   };
  
//   const filteredDrugs = drugs.filter((drug) =>
//     drug.Drug_Name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
  
  
//   const formatDate = (dateString) => {
//     const dateObject = new Date(dateString);
//     const year = dateObject.getFullYear();
//     const month = dateObject.getMonth() + 1;
//     const day = dateObject.getDate();
//     return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
//   };

//   const handleQuantityChange = (drugId, newQuantity) => {
//     setQuantity({ ...quantity, [drugId]: newQuantity });
//   };

//   return (
//     <div >
//       <h2>Drug Purchase</h2>
//       <div>
//         <label htmlFor="searchTerm">Search Drug:</label>
//         <input
//           type="text"
//           id="searchTerm"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Drug Id</th>
//             <th>Drug Name</th>
//             <th>Drug Use</th>
//             <th>Quantity in Stock</th>
//             <th>Expiry Date</th>
//             <th>MRP</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredDrugs.map((drug) => (
//             <tr key={drug.Drug_ID}>
//               <td>{drug.Drug_ID}</td>
//               <td>{drug.Drug_Name}</td>
//               <td>{drug.Drug_Use}</td>
//               <td>{drug.Quantity}</td>
//               <td>{formatDate(drug.Expiry_Date)}</td>
//               <td>{drug.MRP}</td>
//               <td>
//                 <input
//                   type="number"
//                   min="1"
//                   value={quantity[drug.Drug_ID] || 1}
//                   onChange={(e) => handleQuantityChange(drug.Drug_ID, e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={selectedDrugs.includes(drug.Drug_ID)}
//                   onChange={() => handleDrugSelection(drug.Drug_ID)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {orderPlaced && (
//         <p>Your order has been placed successfully!</p>
//       )}
//       {!orderPlaced && (
//         <button onClick={placeOrder}>Place Order</button>
//       )}
//     </div>
//   );
// };

// export default PurchaseDrug;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PurchaseDrug = () => {
  const { userid } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [drugs, setDrugs] = useState([]);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/drugs');
        setDrugs(response.data);
      } catch (error) {
        console.error('Error fetching drugs:', error);
      }
    };

    fetchDrugs();
  }, []);

  const placeOrder = async () => {
    const orderData = {
      user_id: userid,
      drugs: selectedDrugs.map((drugId) => ({
        drug_id: drugId,
        quantity: quantities[drugId] || 1,
      })),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/orders/place-order', orderData);

      if (response.data.success) {
        setOrderPlaced(true);
      } else {
        console.error('Order placement failed.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleDrugSelection = (drugId) => {
    const isSelected = selectedDrugs.includes(drugId);
    if (isSelected) {
      setSelectedDrugs(selectedDrugs.filter((id) => id !== drugId));
    } else {
      setSelectedDrugs([...selectedDrugs, drugId]);
    }
  };

  const handleQuantityChange = (drugId, newQuantity) => {
    setQuantities({ ...quantities, [drugId]: newQuantity });
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  };

  return (
    <div>
      <h2>Drug Purchase</h2>
      <div>
        <label htmlFor="searchTerm">Search Drug:</label>
        <input
          type="text"
          id="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Drug Id</th>
            <th>Drug Name</th>
            <th>Drug Use</th>
            <th>Expiry Date</th>
            <th>MRP</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug) => (
            <tr key={drug.Drug_ID}>
              <td>{drug.Drug_ID}</td>
              <td>{drug.Drug_Name}</td>
              <td>{drug.Drug_Use}</td>
              <td>{formatDate(drug.Expiry_Date)}</td>
              <td>{drug.MRP}</td>
              <td>
                {drug.Quantity === 0 ? (
                  <span>Out of Stock</span>
                ) : (
                  <input
                    type="number"
                    min="1"
                    max={drug.Quantity}
                    value={quantities[drug.Drug_ID] || 1}
                    onChange={(e) => handleQuantityChange(drug.Drug_ID, e.target.value)}
                  />
                )}
                <input
                  type="checkbox"
                  checked={selectedDrugs.includes(drug.Drug_ID)}
                  disabled={drug.Quantity === 0}
                  onChange={() => handleDrugSelection(drug.Drug_ID)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orderPlaced && <p>Your order has been placed successfully!</p>}
      {!orderPlaced && (
        <button onClick={placeOrder} disabled={selectedDrugs.length === 0}>
          Place Order
        </button>
      )}
    </div>
  );
};

export default PurchaseDrug;
