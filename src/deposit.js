import React, { useState } from 'react';
import { firestore } from './firebase'; // Ensure this is the path to your firebase.js
import { Card } from './context'; // Assuming you have a Card component

function Deposit() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');  

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function DepositMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {
            props.setShow(true);
            props.setStatus('');
        }}>
          Deposit again
      </button>
    </>
  );
} 

function DepositForm(props) {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  async function handle() {
    if (!email || !amount) {
      props.setStatus('Email and amount are required');
      return;
    }

    try {
      const userRef = firestore.collection('users').doc(email);
      const doc = await userRef.get();

      if (!doc.exists) {
        props.setStatus('No such user found');
        return;
      }

      const userData = doc.data();
      const newBalance = (userData.balance || 0) + parseFloat(amount);

      await userRef.update({ balance: newBalance });

      props.setStatus(`Deposit successful! New balance: $${newBalance}`);
      props.setShow(false);
    } catch (error) {
      props.setStatus(`Deposit failed: ${error.message}`);
      console.error('Error updating balance:', error);
    }
  }

  return (
    <>
      Email<br/>
      <input 
        type="email" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}
      /><br/>
      
      Amount<br/>
      <input 
        type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} 
        onChange={e => setAmount(e.currentTarget.value)}
      /><br/>

      <button 
        type="submit" 
        className="btn btn-light" 
        onClick={handle}
      >
        Deposit
      </button>
    </>
  );
}

export default Deposit;
