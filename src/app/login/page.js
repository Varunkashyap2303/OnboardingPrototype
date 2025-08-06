'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const CORRECT_PASSWORD = '5032TA30';

  useEffect(() => {
    // If already logged in, redirect to home
    if (typeof window !== 'undefined' && localStorage.getItem('loggedIn') === 'true') {
      router.push('/');
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem('loggedIn', 'true');
      router.push('/');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: '1rem' }}>Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
