import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';

const CustomSignUp = () => {
  const { isLoaded, signUp } = useSignUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification();
      // Redirect or show success message
    } catch (err) {
      setError(err.errors ? err.errors[0].message : 'Something went wrong.');
    }
  };

  return (
    <div style={{ background: '#0d1117', color: '#ffffff', padding: '2rem', borderRadius: '8px' }}>
      <h2 style={{ color: '#1e90ff' }}>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              background: '#161b22',
              color: '#ffffff',
              border: '1px solid #30363d',
              padding: '0.5rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              width: '100%',
            }}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              background: '#161b22',
              color: '#ffffff',
              border: '1px solid #30363d',
              padding: '0.5rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              width: '100%',
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            background: '#1e90ff',
            color: '#ffffff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default CustomSignUp;
