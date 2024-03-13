// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Store = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [drugs, setDrugs] = useState([]);

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

//   const updateQuantity = async (drugId, newQuantity) => {
//     try {
//       await axios.put(`http://localhost:5000/api/drugs/${drugId}`, { quantity: newQuantity });
//       // Refresh drug list after updating quantity
//       const response = await axios.get('http://localhost:5000/api/drugs');
//       setDrugs(response.data);
//     } catch (error) {
//       console.error('Error updating drug quantity:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Drug Details</h2>
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
//             <th>Update Quantity</th>
//           </tr>
//         </thead>
//         <tbody>
//           {drugs.map((drug) => (
//             <tr key={drug.Drug_ID}>
//               <td>{drug.Drug_ID}</td>
//               <td>{drug.Drug_Name}</td>
//               <td>{drug.Drug_Use}</td>
//               <td>{drug.Quantity}</td>
//               <td>{drug.Expiry_Date}</td>
//               <td>{drug.MRP}</td>
//               <td>
//                 <input
//                   type="number"
//                   value={drug.Quantity}
//                   onChange={(e) => updateQuantity(drug.Drug_ID, e.target.value)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Store;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Store = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [drugs, setDrugs] = useState([]);

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

  const updateQuantity = async (drugId, newQuantity) => {
    try {
      await axios.put(`http://localhost:5000/api/drugs/${drugId}`, { quantity: newQuantity });
      // Refresh drug list after updating quantity
      const response = await axios.get('http://localhost:5000/api/drugs');
      setDrugs(response.data);
    } catch (error) {
      console.error('Error updating drug quantity:', error);
    }
  };
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  };
  const filteredDrugs = drugs.filter((drug) =>
    drug.Drug_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div>
      <h2>Drug Details</h2>
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
            <th>Quantity in Stock</th>
            <th>Expiry Date</th>
            <th>MRP</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrugs.map((drug) => (
            <tr key={drug.Drug_ID}>
              <td>{drug.Drug_ID}</td>
              <td>{drug.Drug_Name}</td>
              <td>{drug.Drug_Use}</td>
              <td>{drug.Quantity}</td>
              <td>{formatDate(drug.Expiry_Date)}</td>
              <td>{drug.MRP}</td>
              <td>
                <button
                  onClick={() => {
                    const newQuantity = prompt('Enter new quantity:');
                    if (newQuantity !== null) {
                      updateQuantity(drug.Drug_ID, newQuantity);
                    }
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Store;

