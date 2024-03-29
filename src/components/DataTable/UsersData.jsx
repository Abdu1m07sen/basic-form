// DataTable.js
import React, { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { database, databasePath } from "../firebaseConfig/firebase";
import { Row, Table, ListGroup, Card } from "react-bootstrap";
import "./UsersData.scss";

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
      console.error("Error reading data from Firebase:", error.message);
    };

    // Listen for changes in real-time
    onValue(databaseRef, handleData, { error: handleError });

    // Clean up the listener when component unmounts
    return () => {
      off(databaseRef, "value", handleData);
    };
  }, []);

  return (
    <div>
      <Row className="mb-3">
        <Card className="text-center">
          <h2>Users Data</h2>
          {submittedData.length > 0 ? (
            <div className="d-md-flex flex-wrap gap-3 justify-content-center">
            {submittedData.map((item, index) => (
              <ListGroup key={index} className="my-4 w-sm-25">
                <ListGroup.Item>
                  <h4>Full Name</h4>
                  {item.fullName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Phone Number</h4>
                  {item.phoneNumber}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Email</h4>
                  {item.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Password</h4>
                  {item.password}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Job Type</h4>
                  {item.jobType}
                </ListGroup.Item>
              </ListGroup>
            ))}
          </div>
          ) : 
          (
            <h4>No data</h4>
          )}
        </Card>
      </Row>
    </div>
  );
};

export default DataTable;
