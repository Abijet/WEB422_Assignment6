import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '@/lib/authenticate';

export default function Register() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser(user, password, password2);
      router.push('/login');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" onChange={e => setUser(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirm Password" onChange={e => setPassword2(e.target.value)} />
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
}