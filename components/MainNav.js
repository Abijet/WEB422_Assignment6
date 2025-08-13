import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const router = useRouter();
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  function logout() {
    setSearchHistory([]);
    removeToken();
    router.push('/login');
  }

  function submitSearch(e) {
    e.preventDefault();
    const searchField = e.target.search.value.trim();
    if (searchField) {
      setSearchHistory((prev) => [...prev, searchField]);
      router.push(`/search?q=${searchField}`);
    }
  }

  return (
    <nav>
      <Link href="/">Home</Link> |{' '}
      <Link href="/favourites">Favourites</Link> |{' '}
      <Link href="/history">History</Link> |{' '}
      <Link href="/about">About</Link> |{' '}
      <form onSubmit={submitSearch} style={{ display: 'inline' }}>
        <input type="text" name="search" placeholder="Search..." />
        <button type="submit">Go</button>
      </form>
      <button onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
    </nav>
  );
}
