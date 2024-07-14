import React, { useState } from 'react';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { firestore } from './firebase'; // Ensure this is the correct path
import { Card, UserContext } from './context'; // Import Card and UserContext correctly

function Balance() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus} /> :
        <BalanceMsg setShow={setShow} setStatus={setStatus} />}
    />
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}>
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = useState('');
  const [balance, setBalance] = useState('');

  async function handle() {
    try {
      const q = query(collection(firestore, 'accounts'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        setBalance(userData.balance);
        props.setStatus(`Balance: ${userData.balance}`);
        props.setShow(false);
        console.log('User data:', userData);
      } else {
        props.setStatus('User not found');
        console.log('User not found');
      }
    } catch (err) {
      props.setStatus('Error: ' + err.message);
      console.log('Error:', err.message);
    }
  }

  return (
    <>
      Email<br />
      <input type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)} /><br />

      <button type="submit"
        className="btn btn-light"
        onClick={handle}>
        Check Balance
      </button>
    </>
  );
}

export default Balance;


