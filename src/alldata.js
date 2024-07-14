import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase'; // Ensure this is the correct path

function AllData() {
  const [data, setData] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'accounts'));
        const accounts = querySnapshot.docs.map(doc => doc.data());
        setData(JSON.stringify(accounts, null, 2)); // Format data for better readability
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h5>All Data in Store:</h5>
      <pre>{data}</pre> {/* Using <pre> to maintain formatting */}
    </>
  );
}

export default AllData;

