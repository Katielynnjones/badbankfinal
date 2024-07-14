import React, { useState } from 'react';
import { Card } from './context';
import { auth } from './firebase'; // Importing auth from firebase

function Login() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');

  async function handleLogin(email, password) {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setStatus('');
      setShow(false);
      console.log('Login successful');
    } catch (error) {
      setStatus('Login failed: ' + error.message);
      console.log('Login error:', error);
    }
  }

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm handleLogin={handleLogin} setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ); 
}

function LoginMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>
          Authenticate again
      </button>
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin(email, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input 
          type="email" 
          className="form-control" 
          placeholder="Enter email" 
          value={email} 
          onChange={e => setEmail(e.currentTarget.value)}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input 
          type="password" 
          className="form-control" 
          placeholder="Enter password" 
          value={password} 
          onChange={e => setPassword(e.currentTarget.value)}
          required
        />
      </label>
      <br />
      <button type="submit" className="btn btn-light">Login</button>
    </form>
  );
}

export default Login;

