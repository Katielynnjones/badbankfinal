import React from 'react';
import {Card} from './context'; // Assuming Card component is imported

function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>
      }
    />
  );
}

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="button"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}
      >
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle() {
    fetch(`/account/update/${email}/-${amount}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          props.setStatus(JSON.stringify(data.value));
          props.setShow(false);
          console.log('JSON:', data);
        } catch (err) {
          props.setStatus('Withdrawal failed');
          console.log('err:', text);
        }
      });
  }

  return (
    <>
      <label>Email</label><br/>
      <input
        type="email"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
      /><br/>

      <label>Amount</label><br/>
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={e => setAmount(e.currentTarget.value)}
      /><br/>

      <button
        type="button"
        className="btn btn-light"
        onClick={handle}
      >
        Withdraw
      </button>
    </>
  );
}

export default Withdraw;

