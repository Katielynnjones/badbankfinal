import React, { useState } from 'react';

function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Prepare data for submission
    const formData = {
      name: name,
      email: email,
      password: password
    };

    try {
      // Make POST request to Firebase Function endpoint
      const response = await fetch('https://us-central1-katie-jonesbankingapp.cloudfunctions.net/createAccount/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Check response status
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle success or error messages
      const data = await response.json();
      console.log('Account creation successful:', data);

      // Optionally, update UI or show success message
    } catch (error) {
      console.error('Error creating account:', error.message);
      // Optionally, update UI or show error message
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccount;




//https://us-central1-katie-jonesbankingapp.cloudfunctions.net/createAccount/createAccount
