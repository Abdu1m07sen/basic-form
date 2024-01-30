// DataTable.js
import React, { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database, databasePath } from '../firebaseConfig/firebase';
import { Table } from 'react-bootstrap';

const DataTable = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const databaseRef = ref(database, databasePath);

  useEffect(() => {
    const handleData = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataArray = Object.values(data);
        setSubmittedData(dataArray);
      } else {
        setSubmittedData([]);
      }
    };

    const handleError = (error) => {
      console.error('Error reading data from Firebase:', error.message);
    };

    // Listen for changes in real-time
    onValue(databaseRef, handleData, { error: handleError });

    // Clean up the listener when component unmounts
    return () => {
      off(databaseRef, 'value', handleData);
    };
  }, []);

  return (
    <div>
      <h2>Data Table</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Password</th>
            <th>Job Type</th>
          </tr>
        </thead>
        <tbody>
          {submittedData.map((item, index) => (
            <tr key={index}>
              <td>{item.fullName}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.jobType}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
