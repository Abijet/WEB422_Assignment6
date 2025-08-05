import { useState } from 'react';
import { useRouter } from 'next/router';
import { authenticateUser } from '@/lib/authenticate';
import { readToken } from '@/lib/authenticate';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, setFavourites] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      const token = readToken();
      setFavourites(token.favourites);
      setSearchHistory(token.history);
      router.push('/favourites');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" onChange={e => setUser(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}